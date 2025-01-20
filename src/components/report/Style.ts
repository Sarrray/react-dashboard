import styled from "styled-components";

const disabledColor = "#555";

const checkboxEditToggle = styled.input.attrs({ type: "checkbox" })`
  display: none;

  &:checked + div {
    color: white;
    transition: color 0.3s;
  }
  &:checked ~ div:last-child {
    color: #343434;
    transition: color 0.3s;
  }
  &:not(:checked) + div {
    color: #343434;
    transition: color 0.3s;
  }
  &:not(:checked) ~ div:last-child {
    color: white;
    transition: color 0.3s;
  }
`;

const labelEditToggle = styled.label`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: fit-content;
  border: 1px solid #000;
  border-radius: 0px;
  background: ${disabledColor};
  font-weight: bold;
  color: ${disabledColor};
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    width: 50%;
    height: 100%;
    left: 0%;
    border-radius: 0px;
    background: white;
    transition: all 0.3s;
  }
  & > div {
    padding: 5px 15px;
    text-align: center;
    z-index: 1;
    letter-spacing: 5px;
  }
  &:has(:checked)::before {
    left: 50%;
  }
`;

const divSuggestTopArea = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  margin-top: 20px;

  & > :nth-child(1) {
    margin-top: 10px;
  }
`;

const divSuggestitemsArea = styled.div`
  position: relative;
  margin-top: 1em;
  padding: 1em 2em;
  border: 1px solid #000;
  display: inline-block;

  & .caption {
    position: absolute;
    top: 0;
    left: 0;
    font-weight: bold;

    font-size: 1em;
    padding: 0 1em;
    margin: 0;
    background-color: #fafafa;
    transform: translateY(-50%) translateX(1em);
  }
`;

const divPDFitemsArea = styled.div`
  position: relative;
  margin-top: 1em;
  border: 1px solid #000;
  display: inline-block;

  & .caption {
    position: absolute;
    top: 0;
    left: 0;
    font-weight: bold;

    font-size: 1em;
    padding: 0 1em;
    margin: 0;
    background-color: #fafafa;
    transform: translateY(-50%) translateX(1em);
  }
  & .pdfarea {
    position: relative;
    width: 835px;
    height: 590px;
  }
`;

const buttonDefault = styled.button`
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

const divHeader = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  justify-content: space-around;
  width: 100%;
`;

const divSuggestAdd = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 20px 1fr 1fr;
  width: 100px;
  gap: 10px;

  & > :nth-child(1) {
    grid-column: 1/3;
    grid-row: 1;
    font-weight: bold;
  }

  & > :nth-child(2) {
    grid-column: 1/3;
    grid-row: 2;
  }

  & > :nth-child(3) {
    grid-column: 1;
    grid-row: 3;
  }

  & > :nth-child(4) {
    grid-column: 2;
    grid-row: 3;
  }
`;

const selectKijunbi = styled.select`
  font-size: 1.2rem;
  padding: 10px 20px 10px 10px;
`;

export {
  checkboxEditToggle,
  labelEditToggle,
  divSuggestTopArea,
  divSuggestitemsArea,
  divPDFitemsArea,
  buttonDefault,
  divHeader,
  divSuggestAdd,
  selectKijunbi,
};
