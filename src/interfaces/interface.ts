export interface ISales {
  date: Date;
  sales: Record<string, number>;
}
export interface ISalesJson {
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

export interface IBudgetActualData {
  month: string;
  budget: number | undefined;
  actual: number | undefined;
  goal: number | undefined;
}

export type IProductInfo = {
  no: number;
  date: string;
  product: string;
  price: number | undefined;
};

export type IFruitBgColor = Record<string, string>;
