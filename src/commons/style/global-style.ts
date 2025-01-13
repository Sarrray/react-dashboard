import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html, #root {
  height: 100%;
  font-size: 18px;
}

body{
  height: 100%;
  padding: 0;
  margin: 0;
  color: ${({ theme: { colors } }) => colors.basefont};
}
`;

export default GlobalStyle;
