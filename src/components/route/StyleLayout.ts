import styled from "styled-components";

const divContainer = styled.div`
  padding: 10px;
  min-height: 100%;
  box-sizing: border-box;
  background-color: #fafafa;
`;

const hTitle = styled.h1`
  position: relative;
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
  padding-left: 25px;

  &::before {
    position: absolute;
    content: "";
    bottom: -3px;
    left: 0;
    width: 0;
    height: 0;
    border: none;
    border-left: solid 15px transparent;
    border-bottom: solid 15px #434f60;
  }
  &::after {
    position: absolute;
    content: "";
    bottom: -3px;
    left: 10px;
    width: 99%;
    border-bottom: solid 3px #434f60;
  }
`;
const divOutlet = styled.div`
  padding: 20px 10px 10px 10px;
`;

export { divContainer, hTitle, divOutlet };
