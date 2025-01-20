import React from "react";
import useHistory from "../../hooks/useHistory";
import * as S from "./Style";
import Table from "./Table";

const History = () => {
  const { dateList, productList, filters, setFilters, filteredHistory } =
    useHistory();

  const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilter);
  };

  return (
    <>
      <S.SearchTable>
        <thead>
          <tr>
            <th>売上日</th>
            <th>商品名</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <select
                name="date"
                value={filters.date}
                onChange={handleChangeFilter}
              >
                {dateList.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select
                name="product"
                value={filters.product}
                onChange={handleChangeFilter}
              >
                <option key={"all"} value={"all"}>
                  全部
                </option>
                {productList.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </S.SearchTable>
      <Table history={filteredHistory} />
    </>
  );
};

export default History;
