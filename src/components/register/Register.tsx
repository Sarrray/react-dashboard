import { useReducer } from "react";
import { IProductInfo } from "../../interfaces/interface";
import { reducer } from "../../reducer/registerReducer";
import RegisterRow from "./RegisterRow";

import * as S from "./Style";
import GraphPieChart2 from "../../graph/GraphPieChart2";

const InitTestData: IProductInfo[] = [
  { no: 1, date: "2025/1/10", product: "いちご", price: 100 },
  { no: 2, date: "2025/1/10", product: "りんご", price: 200 },
];

const Register = () => {
  const [state, dispatch] = useReducer(reducer, InitTestData);

  return (
    <S.divContent>
      <div>
        <S.ButtonAdd type="button" onClick={() => dispatch({ type: "AddRow" })}>
          行追加
        </S.ButtonAdd>
        <S.Table>
          <thead>
            <tr>
              <th>No</th>
              <th>売上日</th>
              <th>商品名</th>
              <th>金額</th>
              <th>行操作</th>
            </tr>
          </thead>
          {state.map((x, index) => (
            <RegisterRow
              key={x.no}
              data={x}
              dispatch={dispatch}
              rowno={index + 1}
            />
          ))}
        </S.Table>
      </div>
      <div style={{ height: 400 }}>
        <GraphPieChart2
          data={state.map((x) => ({ Name: x.product, Value: x.price }))}
        />
      </div>
    </S.divContent>
  );
};

export default Register;
