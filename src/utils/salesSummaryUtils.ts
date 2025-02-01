import {
  IBudgetActualData,
  IMonthlyActual,
  IMonthlyBudget,
  ISales,
} from "../interfaces/interface";
import parseDate from "../utils/parseDate";

type TDayOrMonthKbn = "Day" | "Month";

// 年月日の一致判定
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// 年月の一致判定
const isSameMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

// 年の一致判定
const isSameYear = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear();
};

// 本日または当月の総売上高取得
const getTotalSales = (
  data: ISales[],
  kbn: TDayOrMonthKbn,
  targetDate: Date
): number => {
  const filterMap: Record<TDayOrMonthKbn, (x: ISales) => boolean> = {
    Day: (x) => isSameDay(x.date, targetDate),
    Month: (x) => isSameMonth(x.date, targetDate),
  };

  const d = data.filter(filterMap[kbn]);
  const sales = d.reduce(
    (acc, cur) => acc + Object.values(cur.sales).reduce((a2, c2) => a2 + c2, 0),
    0
  );

  return sales;
};

// 当年の各月の売上高
const getMonthlySales = (
  data: ISales[],
  targetDate: Date
): IMonthlyActual[] => {
  const yeardata = data.filter((x) => isSameYear(x.date, targetDate));
  const yeadataSumSales = yeardata.map((x) => ({
    month: `${x.date.getFullYear().toString()}${(x.date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`,
    actual: Object.values(x.sales).reduce((acc, cur) => acc + cur, 0),
  }));

  const monthlydata: IMonthlyActual[] = Object.entries(
    yeadataSumSales.reduce<{ [key: string]: number }>(
      (acc, { month, actual }) => {
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += actual;
        return acc;
      },
      {}
    )
  ).map((x) => ({ month: x[0], actual: x[1] }));

  return monthlydata;
};

// 当年の各月の予実績
const getBudgetActualFullMonth = (
  budget: IMonthlyBudget[],
  actual: IMonthlyActual[],
  targetDate: Date
): IBudgetActualData[] => {
  const budgetactualdata: IBudgetActualData[] = [];

  const year = targetDate.getFullYear().toString();
  for (let i = 1; i <= 12; i++) {
    const month = `${year}${i.toString().padStart(2, "0")}`;

    const b = budget.find((x) => x.month == month)?.budget ?? undefined;
    const a = actual.find((x) => x.month == month)?.actual ?? undefined;
    const g = a && b && (b ?? 0) != 0 ? Math.trunc((a / b) * 100) : undefined;

    budgetactualdata.push({
      month: month,
      budget: b,
      actual: a,
      goal: g,
    });
  }

  return budgetactualdata;
};

// n日間の売上高上位の商品
const getTopProduct = (
  data: ISales[],
  topX: number,
  periodX: number,
  targetDate: Date
): [string, number][] => {
  // 没：実日付ベース
  // const fromDate = new Date(targetDate);
  // fromDate.setDate(targetDate.getDate() - periodX + 1);
  // const perioddata = data.filter(
  //   (x) => fromDate <= x.date && x.date <= targetDate
  // );

  const t1 = data.filter((x) => x.date <= targetDate);
  const perioddata = t1
    .sort((a, b) => Number(b.date) - Number(a.date))
    .slice(0, periodX);

  const productSales = perioddata.reduce<{ [key: string]: number }>(
    (acc, cur) => {
      Object.entries(cur.sales).forEach((x) => {
        if (!acc[x[0]]) {
          acc[x[0]] = 0;
        }
        acc[x[0]] += x[1];
      });
      return acc;
    },
    {}
  );

  const sortdata = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topX);

  return sortdata;
};

// 月間の売上達成度
const getMonthlyAchievementlevel = (
  monthlybudgetactual: IBudgetActualData[],
  targetDate: Date
) => {
  const filter = (date6digit: string) =>
    /^\d{6}$/.test(date6digit) &&
    isSameMonth(parseDate(`${date6digit}01`)!, targetDate);

  return monthlybudgetactual.find((x) => filter(x.month))?.goal ?? 0;
};

// 年間の売上達成度
const getAnnualAchievementlevel = (
  monthlybudgetactual: IBudgetActualData[],
  targetDate: Date
) => {
  const filter = (date6digit: string) =>
    /^\d{6}$/.test(date6digit) &&
    isSameYear(parseDate(`${date6digit}01`)!, targetDate);

  const data = monthlybudgetactual.filter((x) => filter(x.month));
  const datatotal = data.reduce(
    (acc, cur) => {
      acc.budgetotal += cur.budget ?? 0;
      acc.actualtotal += cur.actual ?? 0;
      return acc;
    },
    { budgetotal: 0, actualtotal: 0 }
  );
  return datatotal.budgetotal !== 0
    ? (datatotal.actualtotal / datatotal.budgetotal) * 100
    : 0;
};

// 前営業日との売上高の差分
const getPreviousdayChange = (data: ISales[], targetDate: Date) => {
  const d = data
    .filter((x) => x.date <= targetDate)
    .sort((a, b) => Number(b.date) - Number(a.date))
    .slice(0, 2);

  if (d.length == 2 && isSameDay(d[0].date, targetDate)) {
    const n = Object.values(d[0].sales).reduce((acc, cur) => acc + cur, 0);
    const p = Object.values(d[1].sales).reduce((acc, cur) => acc + cur, 0);
    return n - p;
  }
  return 0;
};

// 前月の売上高の差分
const getPreviousMonthChange = (data: ISales[], targetDate: Date) => {
  const thisMonthData = data.filter((x) => isSameMonth(x.date, targetDate));
  const prevDate = new Date(targetDate);
  prevDate.setMonth(targetDate.getDate() - 1);
  const prevMonthData = data.filter((x) => isSameMonth(x.date, prevDate));

  const getTotal = (x: ISales[]) => {
    return x.reduce(
      (acc, cur) =>
        acc + Object.values(cur.sales).reduce((a2, c2) => a2 + c2, 0),
      0
    );
  };

  const thisMonthTotal = getTotal(thisMonthData);
  const prevMonthTotal = getTotal(prevMonthData);

  return thisMonthTotal - prevMonthTotal;
};

// n日間の商品毎の売上高
const getMixDataByProduct = (
  data: ISales[],
  periodX: number,
  targetDate: Date
): Record<string, string | number>[] => {
  const t1 = data.filter((x) => x.date <= targetDate);
  const perioddata = t1
    .sort((a, b) => Number(b.date) - Number(a.date))
    .slice(0, periodX);

  if (!perioddata) {
    return [];
  }

  const perioddata2 = perioddata.sort(
    (a, b) => Number(a.date) - Number(b.date)
  );

  const r: Record<string, string | number>[] = [];
  perioddata2.forEach((x) => {
    const pushdata: Record<string, string | number> = {
      date: `${x.date.getFullYear().toString()}${(x.date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${x.date.getDate().toString().padStart(2, "0")}`,
    };
    Object.entries(x.sales).forEach((x) => (pushdata[x[0]] = x[1]));
    r.push(pushdata);
  });

  return r;
};

// 当日の商品の売上高
const getTodayProductData = (
  data: ISales[],
  targetDate: Date
): { Name: string; Value: number }[] => {
  const d = data.find((x) => isSameDay(x.date, targetDate));
  if (!d) {
    return [];
  }
  return Object.entries(d.sales)
    .map((x) => ({ Name: x[0], Value: x[1] }))
    .sort((a, b) => b.Value - a.Value);
};

export {
  getTotalSales,
  getMonthlySales,
  getBudgetActualFullMonth,
  getTopProduct,
  getMonthlyAchievementlevel,
  getAnnualAchievementlevel,
  getPreviousdayChange,
  getPreviousMonthChange,
  getMixDataByProduct,
  getTodayProductData,
};
