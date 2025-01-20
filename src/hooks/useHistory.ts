import { useEffect, useState } from "react";
import salesdata from "../data/fruitsales.json";
import { useKijunbiContext } from "../contexts/KijunbiContextProvider";
import { IProductInfo } from "../interfaces/interface";

const iterateTypedObject = <IProductInfo>(
  obj: IProductInfo,
  callback: (
    key: keyof IProductInfo,
    value: IProductInfo[keyof IProductInfo]
  ) => void
) => {
  if (!obj) {
    return;
  }
  (Object.keys(obj) as Array<keyof IProductInfo>).forEach((key) => {
    callback(key, obj[key]);
  });
};

type TProductSearch = {
  date: string;
  product: string;
};

const useHistory = () => {
  const { kijunbi } = useKijunbiContext();
  const [history, seIProductInfo] = useState<IProductInfo[]>([]);
  const [dateList, setDateList] = useState<string[]>([]);
  const [productList, setProductList] = useState<string[]>([]);
  const [filters, setFilters] = useState<TProductSearch>({
    date: `${kijunbi.substring(0, 4)}/${kijunbi.substring(4, 6)}`,
    product: "all",
  });
  const [filteredHistory, setFilteredHistory] = useState<IProductInfo[]>([]);

  useEffect(() => {
    const h: IProductInfo[] = [];
    salesdata.forEach((x, index) => {
      Object.entries(x.sales).forEach((y) => {
        h.push({
          no: index + 1,
          date: `${x.date.substring(0, 4)}/${x.date.substring(
            4,
            6
          )}/${x.date.substring(6, 8)}`,
          product: y[0],
          price: y[1],
        });
      });
    });
    seIProductInfo(h);
    setDateList([...new Set([...h.map((x) => x.date.substring(0, 7))])]);
    setProductList([...new Set([...h.map((x) => x.product)])]);
    setFilters({
      date: `${kijunbi.substring(0, 4)}/${kijunbi.substring(4, 6)}`,
      product: "all",
    });
  }, [kijunbi]);

  useEffect(() => {
    let h = history;
    iterateTypedObject(filters, (key, value) => {
      if (value != "all") {
        if (key == "date") {
          h = h.filter((x) => x[key].toString().substring(0, 7) == value);
        } else {
          h = h.filter((x) => x[key] == value);
        }
      }
    });
    if (h.length > 0) {
      h.push({
        no: h.length + 2,
        date: "",
        product: "合計金額",
        price: h.reduce((acc, cur) => acc + (cur.price ?? 0), 0),
      });
    }
    setFilteredHistory(h);
  }, [filters, history]);

  return {
    history,
    dateList,
    productList,
    filters,
    setFilters,
    filteredHistory,
  };
};

export default useHistory;
