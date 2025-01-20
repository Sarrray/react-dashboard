import { IProductInfo } from "../interfaces/interface";

export type TAction =
  | { type: "UpdateRow"; data: IProductInfo }
  | { type: "AddRow" }
  | { type: "DeleteRow"; No: number };

export const reducer = (
  state: IProductInfo[],
  action: TAction
): IProductInfo[] => {
  switch (action.type) {
    case "UpdateRow":
      return state.map((x) => (x.no == action.data.no ? action.data : x));
    case "AddRow":
      return [
        ...state,
        {
          no: state.reduce((acc, cur) => Math.max(acc, cur.no) + 1, 0),
          date: "",
          product: "",
          price: undefined,
        },
      ];
    case "DeleteRow":
      return state.filter((x) => x.no != action.No);
  }
};
