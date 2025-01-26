import React, { useEffect } from "react";
import * as S from "./Style";
import KijunbiDDL, { KijunbiDDLProps } from "./KijunbiDDL";
import useSalesSummary from "../../hooks/useSalesSummary";

import fruitsales from "../../data/fruitsales.json";
import budget from "../../data/budget.json";
import PrintButton from "./PrintButton";
import OverviewPrintArea, { OverviewPrintAreaProps } from "./OverviewPrintArea";
import { useKijunbiContext } from "../../contexts/KijunbiContextProvider";

const Overview = () => {
  const {
    inputDate,
    setInputDate,
    salesSummary,
    handleDateChange,
    targetDateList,
  } = useSalesSummary(fruitsales, budget);
  const { kijunbi } = useKijunbiContext();

  useEffect(() => {
    setInputDate(kijunbi);
  }, [kijunbi, setInputDate]);

  const KijunbiDDLMemo = React.memo(
    ({ targetDateList, value, handleChange }: KijunbiDDLProps) => {
      return (
        <KijunbiDDL
          targetDateList={targetDateList}
          value={value}
          handleChange={handleChange}
        />
      );
    }
  );

  const OverviewPrintAreaMemo = React.memo(
    ({ salesSummary }: OverviewPrintAreaProps) => {
      return <OverviewPrintArea salesSummary={salesSummary} />;
    }
  );

  return (
    <S.divOverView>
      <div>
        基準日：
        <KijunbiDDLMemo
          targetDateList={targetDateList}
          value={inputDate}
          handleChange={handleDateChange}
        />
        ← データ登録されている日付のみ表示
        <div className="annotation">
          予実績と商品ごとの売上のグラフはマウスホバーで詳細を表示
        </div>
      </div>
      <div>
        <PrintButton salesSummary={salesSummary} />
      </div>
      <div>
        <OverviewPrintAreaMemo salesSummary={salesSummary} />
      </div>
    </S.divOverView>
  );
};

export default Overview;
