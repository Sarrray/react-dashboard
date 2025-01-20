import { useEffect, useState } from "react";
import {
  IBudgetActualData,
  IMonthlyActual,
  IMonthlyBudget,
  ISales,
} from "../interfaces/interface";

type dispDataType = {
  monthlydata?: IMonthlyActual[];
  monthlybudgetactual?: IBudgetActualData[];
  dayTotalSales?: number;
  monthTotalSales?: number;
  topProductsToday?: [string, number][];
  topProductsByPeriod?: [string, number][];
  mixeddatabyproduct?: Record<string, string | number>[];
  monthlyAchievementlevel?: number;
  annualAchievementlevel?: number;
  previousdayChange?: number;
  monthlyChange?: number;
};

const dispTopNumber = 3;
const dispMixBarChardDataNum = 4;

const useSales = (
  data: ISales[],
  budget: IMonthlyBudget[],
  dispBussinessSpan: number,
  kijunbi: string
) => {
  const [dispData, setDispData] = useState<dispDataType>({});

  useEffect(() => {
    const newDispData: dispDataType = {};
    if (data && data.length != 0) {
      newDispData.monthlydata = getMonthlySales(data, kijunbi);
      newDispData.monthlybudgetactual = getBudgetActualData(
        budget,
        newDispData.monthlydata,
        kijunbi
      );
      newDispData.dayTotalSales = getTotalSales(data, "day", kijunbi);
      newDispData.monthTotalSales = getTotalSales(data, "month", kijunbi);
      newDispData.topProductsToday = getTopPrduct(
        data,
        dispTopNumber,
        1,
        kijunbi
      );
      newDispData.topProductsByPeriod = getTopPrduct(
        data,
        dispTopNumber,
        dispBussinessSpan,
        kijunbi
      );
      newDispData.mixeddatabyproduct = getMixedDataByProduct(
        data,
        dispMixBarChardDataNum,
        dispBussinessSpan,
        kijunbi
      );
      newDispData.monthlyAchievementlevel = getMonthlyAchievementlevel(
        newDispData.monthlybudgetactual,
        kijunbi
      );
      newDispData.annualAchievementlevel = getAnnualAchievementlevel(
        newDispData.monthlybudgetactual,
        kijunbi
      );

      newDispData.previousdayChange = getPreviousdayChange(data, kijunbi);
      newDispData.monthlyChange = getMonthlyChange(data, kijunbi);
    }
    setDispData(newDispData);
  }, [kijunbi, budget, data, dispBussinessSpan]);

  return {
    dispData,
  };
};

const getTotalSales = (
  data: ISales[],
  kbn: "day" | "month",
  kijunbi: string
): number => {
  const splitPos = kbn == "day" ? 8 : 6;

  const r = data
    .filter(
      (x) => x.date.substring(0, splitPos) == kijunbi.substring(0, splitPos)
    )
    .reduce((acc, cur) => {
      for (const v of Object.values(cur.sales)) {
        acc += v;
      }
      return acc;
    }, 0);
  return r;
};

const getMonthlySales = (data: ISales[], kijunbi: string): IMonthlyActual[] => {
  const salesByMonth: IMonthlyActual[] = [];
  data
    .filter((x) => x.date.substring(0, 4) == kijunbi.substring(0, 4))
    .forEach((x) => {
      const month = x.date.substring(0, 6);
      if (!salesByMonth.some((x) => x.month == month)) {
        salesByMonth.push({ month: month, actual: 0 });
      }

      salesByMonth.find((x) => x.month == month)!.actual += Object.values(
        x.sales
      ).reduce((acc, cur) => acc + cur, 0);
    });

  return salesByMonth;
};

const getBudgetActualData = (
  budget: IMonthlyBudget[],
  actual: IMonthlyActual[],
  kijunbi: string
): IBudgetActualData[] => {
  const budgetactualdata: IBudgetActualData[] = [];
  for (let i = 1; i <= 12; i++) {
    const month = `${kijunbi.substring(0, 4)}${i.toString().padStart(2, "0")}`;
    budgetactualdata.push({
      month: month,
    });

    const b = budget.find((x) => x.month == month);
    if (b) {
      budgetactualdata.find((x) => x.month == month)!["budget"] = b.budget;
    }

    const a = actual.find((x) => x.month == month);
    if (a) {
      budgetactualdata.find((x) => x.month == month)!["actual"] = a.actual;
    }

    if (a && b) {
      budgetactualdata.find((x) => x.month == month)!["goal"] = Math.floor(
        (a.actual / b.budget) * 100
      );
    }
  }

  return budgetactualdata;
};

const getTopPrduct = (
  data: ISales[],
  topX: number,
  latestXDays: number,
  kijunbi: string
): [string, number][] => {
  const targetData1 = data?.filter((x) => x.date <= kijunbi);
  const targetData2 = targetData1
    .sort((a, b) => Number(b.date) - Number(a.date))
    .slice(0, latestXDays);

  const sumtargetData: Record<string, number> = {};
  targetData2.forEach((x) => {
    const r = Object.entries(x.sales).forEach((x) => {
      if (!sumtargetData[x[0]]) {
        sumtargetData[x[0]] = 0;
      }
      sumtargetData[x[0]] += x[1];
    });
    return r;
  });

  const topSales = Object.entries(sumtargetData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topX);

  return topSales;
};

const getMixedDataByProduct = (
  data: ISales[],
  topX: number,
  dispBussinessSpan: number,
  kijunbi: string
): Record<string, string | number>[] => {
  const monthData0 = data
    ?.filter((x) => x.date.substring(0, 6) <= kijunbi.substring(0, 6))
    .filter((x) => x.date <= kijunbi);
  if (!monthData0) {
    return [];
  }

  const monthData1 = [...monthData0]
    .sort((a, b) => Number(b.date) - Number(a.date))
    .slice(0, dispBussinessSpan);

  const monthData = [...monthData1].sort(
    (a, b) => Number(a.date) - Number(b.date)
  );

  const r: Record<string, string | number>[] = [];
  monthData.forEach((x) => {
    const sorted = Object.entries(x.sales).sort((a, b) => b[1] - a[1]);
    const r2 = [];
    r2.push(...sorted.slice(0, topX));
    r2.push([
      "その他",
      sorted
        .slice(topX + 1, sorted.length + 1)
        .reduce((acc, cur) => acc + cur[1], 0),
    ]);
    r2.push(["date", x.date]);
    r.push(Object.fromEntries(r2));
  });

  return r;
};

const getMonthlyAchievementlevel = (
  monthlybudgetactual: IBudgetActualData[],
  kijunbi: string
) => {
  return (
    monthlybudgetactual?.find((x) => x.month == kijunbi.substring(0, 6))
      ?.goal ?? 0
  );
};

const getAnnualAchievementlevel = (
  monthlybudgetactual: IBudgetActualData[],
  kijunbi: string
) => {
  const totalYearBudget = monthlybudgetactual
    ?.filter((x) => x.month.substring(0, 4) == kijunbi.substring(0, 4))
    .reduce((acc, cur) => acc + (cur.budget ?? 0), 0);

  if (totalYearBudget) {
    return Math.floor(
      ((monthlybudgetactual?.find((x) => x.month == kijunbi.substring(0, 6))
        ?.actual ?? 0) /
        totalYearBudget) *
        100
    );
  } else {
    return 0;
  }
};

const getPreviousdayChange = (data: ISales[], kijunbi: string) => {
  const cur = data
    .filter((x) => x.date <= kijunbi)
    .sort((a, b) => Number(b.date) - Number(a.date))
    .slice(0, 2);

  if (cur.length == 2 && cur[0].date == kijunbi) {
    const n = Object.values(cur[0].sales).reduce((acc, cur) => acc + cur, 0);
    const p = Object.values(cur[1].sales).reduce((acc, cur) => acc + cur, 0);
    return n - p;
  }
  return 0;
};

const getMonthlyChange = (data: ISales[], kijunbi: string) => {
  const cData = data.filter(
    (x) => x.date.substring(0, 6) == kijunbi.substring(0, 6)
  );
  const cMonth = new Date(
    Number(kijunbi.substring(0, 4)),
    Number(kijunbi.substring(5, 6)) - 1,
    Number(kijunbi.substring(7, 8))
  );

  const pMonth = new Date(cMonth.setMonth(cMonth.getMonth() - 1));

  const pData = data.filter(
    (x) =>
      x.date.substring(0, 6) ==
      pMonth.getFullYear() + (pMonth.getMonth() + 1).toString().padStart(2, "0")
  );

  const getTotal = (data: ISales[]) => {
    let total = 0;
    data.forEach((x) => {
      const dayTotal = Object.values(x.sales).reduce(
        (acc, cur) => acc + cur,
        0
      );
      total += dayTotal;
    });
    return total;
  };

  if (cData.length != 0 && pData.length != 0) {
    return getTotal(cData) - getTotal(pData);
  } else {
    return 0;
  }

  return 0;
};

export default useSales;
