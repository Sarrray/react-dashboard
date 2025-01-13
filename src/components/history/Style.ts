import styled from "styled-components";

const LineColor = "#aaaaaa";

const baseTable = styled.table`
  border-top: 1px solid ${LineColor};
  border-left: 1px solid ${LineColor};

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
    text-align: left;
    padding: 7px;

    border-bottom: 1px solid ${LineColor};
    /* border-right: 1px solid ${LineColor}; */
  }

  td:last-child {
    border-right: 1px solid ${LineColor};
  }
`;

const SearchTable = styled(baseTable)`
  width: 500px;
  display: grid;
  border-collapse: collapse;
  grid-template-columns:
    minmax(200px, 1fr)
    minmax(200px, 2fr);
  margin-bottom: 15px;

  th,
  td {
    border-right: 1px solid ${LineColor};
  }

  td {
    height: 40px;
  }

  select {
    width: 100%;
    height: 100%;
    font-size: 1rem;
  }
`;

const Table = styled(baseTable)`
  min-width: 500px;
  display: grid;
  border-collapse: collapse;
  grid-template-columns:
    minmax(80px, 80px)
    minmax(200px, 1fr)
    minmax(200px, 4.5fr)
    minmax(150px, 1.5fr);
  // minmax(100px, 1fr)
  // minmax(100px, 2fr);

  tr:nth-child(odd) td {
    background-color: #f4f5f6;
  }
`;

export { SearchTable, Table };
