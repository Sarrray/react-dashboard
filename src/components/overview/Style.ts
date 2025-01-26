import styled from "styled-components";

const divUriageRow = styled.div`
  display: grid;
  grid-template-columns: 220px 220px 1fr;
  gap: 10px;
`;

const divCard = styled.div<{
  $margin?: string;
  $padding?: string;
}>`
  margin: ${(props) => props.$margin ?? `0`};
  padding: ${(props) => props.$padding ?? `10px`};
  box-shadow: 0px 3px 3px #434f60;
  line-height: 1.5;
  border: 1px solid #ccc;

  h3 {
    &:before {
      content: "■";
    }
    margin: 0;
  }
`;

const divSalesCard = styled(divCard)`
  display: grid;
  grid-template-rows: 1fr 0.8fr 0.8fr 3.5fr;
  grid-template-columns: 1fr;
  background-color: #ffffff;

  .item1 {
    grid-row: 1;
    grid-column: 1;
    font-weight: bold;
    padding-left: 5px;
    white-space: nowrap;
    align-items: center;
  }
  .item2 {
    display: grid;
    grid-row: 2;
    grid-column: 1;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
    align-items: end;
  }
  .item3 {
    display: grid;
    grid-row: 3;
    grid-column: 1;
    font-size: 0.8rem;
    justify-content: center;
    align-items: top;
  }
  .item4 {
    display: grid;
    grid-row: 4;
    grid-column: 1/3;
    align-items: center;
    justify-content: center;
  }
`;

const divUriageProductCardRow = styled(divCard)`
  margin-top: 15px;
  display: grid;
  grid-template-columns: 1fr 450px;
  grid-template-rows: 1fr;

  .card-2 {
    margin-top: 20px;
  }
`;

const buttonOutputPDF = styled.button`
  color: #fff;
  font-size: 15px;
  letter-spacing: 2px;
  width: 130px;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  background: #434f60;

  &:disabled {
    color: #888;
  }
`;

const divOverView = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  & > :nth-child(1) {
    grid-column: 1;
    grid-row: 1;
    align-self: center;
    font-weight: bold;
    .annotation {
      margin-top: 5px;
    }
  }

  & > :nth-child(2) {
    grid-column: 2;
    grid-row: 1;
    justify-self: end;
  }

  & > :nth-child(3) {
    grid-column: 1/3;
    grid-row: 2;
    width: 100%;
  }
`;

const SelectKijunbi = styled.select`
  font-size: 1.2rem;
  padding: 5px 20px 5px 5px;
`;

export {
  divCard,
  divSalesCard,
  divUriageRow,
  divUriageProductCardRow,
  buttonOutputPDF,
  divOverView,
  SelectKijunbi,
};
