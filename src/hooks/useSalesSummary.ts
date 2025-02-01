import { useCallback, useEffect, useMemo, useState } from "react";
import parseDate from "../utils/parseDate";
import {
  getAnnualAchievementlevel,
  getBudgetActualFullMonth,
  getMixDataByProduct,
  getMonthlyAchievementlevel,
  getMonthlySales,
  getPreviousdayChange,
  getPreviousMonthChange,
  getTodayProductData,
  getTopProduct,
  getTotalSales,
} from "../utils/salesSummaryUtils";
import { IMonthlyBudget, ISales, ISalesJson } from "../interfaces/interface";

export type TSummary =
  | "本日の総売上高"
  | "当月の総売上高"
  | "当年の各月の売上高"
  | "当年の予実績"
  | "本日の売上高上位の商品"
  | "n日間の売上高上位の商品"
  | "月間の売上達成度"
  | "年間の売上達成度"
  | "前営業日との売上高の差分"
  | "前月との売上高の差分"
  | "n日間の商品毎の売上高"
  | "当日の商品の売上高";

const useSalesSummary = (
  salesJson: ISalesJson[],
  budget?: IMonthlyBudget[]
) => {
  const [inputDate, setInputDate] = useState<string>("");
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [sales] = useState<ISales[]>(
    salesJson
      .map((x) => ({
        date: parseDate(x.date) ?? new Date(0, 0, 0),
        sales: x.sales,
      }))
      .filter((x) => x.date != new Date(0, 0, 0))
  );
  const [targetDateList] = useState(sales.map((x) => x.date));

  useEffect(() => {
    setTargetDate(parseDate(inputDate));
  }, [inputDate]);

  const handleDateChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setInputDate(event.target.value);
    },
    []
  );

  const salesSummary: { [key in TSummary]: any } = useMemo(() => {
    if (targetDate) {
      const monthlySales = getMonthlySales(sales, targetDate);
      const budgetActual = budget
        ? getBudgetActualFullMonth(budget, monthlySales, targetDate)
        : null;

      return {
        本日の総売上高: getTotalSales(sales, "Day", targetDate),
        当月の総売上高: getTotalSales(sales, "Month", targetDate),
        当年の各月の売上高: monthlySales,
        当年の予実績: budgetActual,
        本日の売上高上位の商品: getTopProduct(sales, 3, 1, targetDate),
        n日間の売上高上位の商品: getTopProduct(sales, 3, 5, targetDate),
        月間の売上達成度: budgetActual
          ? Math.trunc(getMonthlyAchievementlevel(budgetActual, targetDate))
          : null,
        年間の売上達成度: budgetActual
          ? Math.trunc(getAnnualAchievementlevel(budgetActual, targetDate))
          : null,
        前営業日との売上高の差分: getPreviousdayChange(sales, targetDate),
        前月との売上高の差分: getPreviousMonthChange(sales, targetDate),
        n日間の商品毎の売上高: getMixDataByProduct(sales, 5, targetDate),
        当日の商品の売上高: getTodayProductData(sales, targetDate),
      };
    } else {
      return {
        本日の総売上高: null,
        当月の総売上高: null,
        当年の各月の売上高: null,
        当年の予実績: null,
        本日の売上高上位の商品: null,
        n日間の売上高上位の商品: null,
        月間の売上達成度: null,
        年間の売上達成度: null,
        前営業日との売上高の差分: null,
        前月との売上高の差分: null,
        n日間の商品毎の売上高: null,
        当日の商品の売上高: null,
      };
    }
  }, [sales, budget, targetDate]);

  return {
    inputDate,
    setInputDate,
    salesSummary,
    handleDateChange,
    targetDateList,
  };
};

export default useSalesSummary;
