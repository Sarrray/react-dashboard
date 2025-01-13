import React from "react";
import { IProductInfo } from "../../interfaces/interface";
import { TAction } from "../../reducer/registerReducer";

type RegisterRowProps = {
  data: IProductInfo;
  dispatch: React.Dispatch<TAction>;
  rowno: number;
};

const NameItem = {
  no: "no",
  date: "date",
  product: "product",
  price: "price",
} as const;
const Datatype = { number: "number" } as const;

const RegisterRow = ({ data, dispatch, rowno }: RegisterRowProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input: string | number = e.target.value;
    if (e.target.dataset.datatype == Datatype.number) {
      input = Number(input);
    }
    const newObj = { ...data, [e.target.name]: input };
    dispatch({ type: "UpdateRow", data: newObj });
  };

  return (
    <tbody>
      <tr>
        <td>{rowno}</td>
        <td>
          <input
            type="text"
            name={NameItem.date}
            value={data.date}
            onChange={handleChange}
          />
        </td>
        <td>
          <input
            type="text"
            name={NameItem.product}
            value={data.product}
            onChange={handleChange}
          />
        </td>
        <td>
          <input
            type="number"
            name={NameItem.price}
            value={data.price || ""}
            onChange={handleChange}
            data-datatype={Datatype.number}
          />
        </td>
        <td>
          <button
            type="button"
            onClick={() => dispatch({ type: "DeleteRow", No: data.no })}
          >
            削除
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default RegisterRow;
