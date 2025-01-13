import { Outlet, useLocation } from "react-router";
import { NavLists } from "./RouteList";
import * as S from "./StyleLayout";

const Layout = () => {
  const location = useLocation();
  const accessPage = NavLists.filter((d) => d.url === location.pathname)[0];

  return (
    <>
      <S.divContainer>
        <S.hTitle>{accessPage?.title}</S.hTitle>
        <S.divOutlet>
          <Outlet />
        </S.divOutlet>
      </S.divContainer>
    </>
  );
};

export default Layout;
