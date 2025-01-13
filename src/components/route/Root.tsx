import { BrowserRouter, Navigate, NavLink, Route, Routes } from "react-router";

import * as S from "./Style";
import Layout from "./Layout";
import { NavLists } from "./RouteList";
import TitleIcon from "./TitleIcon";

const Root = () => {
  return (
    <BrowserRouter>
      <S.divContainer>
        <S.divContainerLeft>
          <S.navList>
            <TitleIcon />
            <ul>
              {NavLists.map((d) => {
                return (
                  <li key={d.key}>
                    <NavLink to={d.url}>
                      {d.icon}
                      {d.title}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </S.navList>
        </S.divContainerLeft>
        <S.divContainerRight>
          <Routes>
            <Route element={<Layout />}>
              {NavLists.sort((a, b) => a.sort - b.sort).map((d) => {
                return <Route key={d.key} path={d.url} element={d.element} />;
              })}
              <Route
                path="*"
                element={
                  <Navigate
                    to={NavLists.find((x) => x.defaultpage == true)?.url ?? ""}
                  />
                }
              />
            </Route>
          </Routes>
        </S.divContainerRight>
      </S.divContainer>
    </BrowserRouter>
  );
};

export default Root;
