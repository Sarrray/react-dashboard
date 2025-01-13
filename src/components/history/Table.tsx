import { IProductInfo } from "../../interfaces/interface";
import * as S from "./Style";

type TablePropsType = {
  history: IProductInfo[];
};

const Table = ({ history }: TablePropsType) => {
  return (
    <>
      <S.Table>
        <thead>
          <tr>
            <th>No</th>
            <th>売上日</th>
            <th>商品名</th>
            <th>金額</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h: IProductInfo, index: number) => (
            <tr key={index + 1}>
              <td>{h.product == "合計金額" ? "" : index + 1}</td>
              <td>{h.date}</td>
              <td>{h.product}</td>
              <td>{h.price?.toLocaleString()}円</td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </>
  );
};

export default Table;
