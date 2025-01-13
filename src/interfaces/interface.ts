export interface ISales {
  date: string;
  sales: Record<string, number>;
}

export interface IMonthlyActual {
  month: string;
  actual: number;
}

export interface IMonthlyBudget {
  month: string;
  budget: number;
}

export type IBudgetActualData = {
  month: string;
  budget?: number;
  actual?: number;
  goal?: number;
};

export type IProductInfo = {
  no: number;
  date: string;
  product: string;
  price: number | undefined;
};

export type IFruitBgColor = Record<string, string>;
