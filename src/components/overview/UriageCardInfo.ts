import { CardInfoType } from "./UriageCard";

export const cardsize = { width: 220, height: 280 };

export const CardInfo: CardInfoType[] = [
  {
    cardinfo: {
      kbn: "day",
      title: "本日の売上高",
      toplabel: "",
      bottomlabel: "",
      colors: ["#ff708f", "#e7e7ea"],
      insideTopLabel: "月間達成度",
      insideBottomLabel: "",
    },
  },
  {
    cardinfo: {
      kbn: "month",
      title: "今月の売上高",
      toplabel: "",
      bottomlabel: "",
      colors: ["#7397e6", "#e7e7ea"],
      insideTopLabel: "年間達成度",
      insideBottomLabel: "",
    },
  },
];
