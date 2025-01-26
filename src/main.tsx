import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { theme } from "./commons/style/theme";
import GlobalStyle from "./commons/style/global-style";
import Root from "./components/route/Root";
import { KijunbiProvider } from "./contexts/KijunbiProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <KijunbiProvider>
        <Root />
      </KijunbiProvider>
    </ThemeProvider>
  </StrictMode>
);
