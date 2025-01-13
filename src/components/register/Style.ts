import styled from "styled-components";

const LineColor = "#aaaaaa";

const divContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
`;

const Table = styled.table`
  border-top: 1px solid ${LineColor};
  border-left: 1px solid ${LineColor};
  background-color: #fff;
  margin-top: 10px;

  display: grid;
  border-collapse: collapse;
  grid-template-columns:
    minmax(50px, 50px)
    minmax(100px, 1fr)
    minmax(200px, 2fr)
    minmax(100px, 1fr)
    minmax(70px, 70px);
  grid-auto-rows: 50px;

  thead,
  tbody,
  tfoot,
  tr {
    display: contents;
  }

  th {
    background-color: #434f60;
    color: #fff;
  }

  th,
  td {
    display: table-cell;
    text-align: center;
    align-content: center;
    padding: 7px 5px;

    border-bottom: 1px solid ${LineColor};
    border-right: 1px solid ${LineColor};

    input {
      width: 100%;
      height: 100%;
      font-size: 1rem;
      padding: 2px 3px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 4px;
      outline: none;

      &[type="number"]::-webkit-outer-spin-button,
      &[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    button {
      width: 100%;
      height: 100%;
      letter-spacing: 2px;
    }
  }

  td:last-child {
    border-right: 1px solid ${LineColor};
  }
`;

const ButtonAdd = styled.button`
  color: #fff;
  font-size: 15px;
  letter-spacing: 2px;
  width: 130px;
  padding-top: 3px;
  padding-bottom: 3px;
  cursor: pointer;
  background: #434f60;
`;

export { divContent, Table, ButtonAdd };
