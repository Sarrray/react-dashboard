import { RiHome4Line } from "react-icons/ri";
import { BiPurchaseTag } from "react-icons/bi";
import * as S from "./Style";

import Overview from "../overview/Overview";
import History from "../history/History";
import Register from "../register/Register";
import { MdHistoryEdu } from "react-icons/md";

type NavType = {
  key: string;
  title: string;
  url: string;
  element: JSX.Element;
  icon: JSX.Element;
  sort: number;
  defaultpage?: boolean;
};

export const NavLists: NavType[] = [
  {
    key: "overview",
    title: "概要",
    url: "/overview",
    element: <Overview />,
    icon: <RiHome4Line {...S.NavIconAttr} />,
    sort: 1,
    defaultpage: true,
  },
  {
    key: "history",
    title: "売上履歴",
    url: "/history",
    element: <History />,
    icon: <MdHistoryEdu {...S.NavIconAttr} />,
    sort: 2,
  },
  {
    key: "register",
    title: "売上登録",
    url: "/register",
    element: <Register />,
    icon: <BiPurchaseTag {...S.NavIconAttr} />,
    sort: 3,
  },
];
