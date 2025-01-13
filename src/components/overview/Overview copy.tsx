import * as htmlToImage from "html-to-image";
import * as S from "./Style";
import UriageCard, { CardInfoType } from "./UriageCard";
import { TopLine } from "./TopSales";
import useSales from "../../hooks/useSales";

import GraphBarChart from "../../graph/GraphBarChart";
import GraphMixBarChart from "../../graph/GraphMixBarChart";

import salesdata from "../../data/fruitsales.json";
import fruitbgcolor from "../../data/fruitbgcolor.json";
import budge from "../../data/budget.json";
import { useEffect, useRef, useState } from "react";
import { usePDF } from "@react-pdf/renderer";
import OverviewPdf from "./OverviewPdf";
import { createRoot } from "react-dom/client";

const CardInfo: CardInfoType[] = [
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

const cardsize = { width: 220, height: 280 };
const dispBussinessSpan = 5;
const tempDivId = "tempDivId";

const Overview = () => {
  const { dispData } = useSales(salesdata, budge, dispBussinessSpan);
  const [pdfflg, setPdfflg] = useState(false);
  const [pdf, update] = usePDF({ document: <></> });
  const printAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pdfflg && pdf.url) {
      window.open(pdf.url ?? "", "_blank");
    }
    const tempDiv = document.getElementById(tempDivId);
    if (tempDiv) {
      tempDiv.remove();
    }
    setPdfflg(false);
    update(<></>);
  }, [pdf.url]);

  const handleOnClickAsync = async () => {
    setPdfflg(true);
    const tempDiv = document.createElement("div");
    const root = createRoot(tempDiv);
    const a = <GraphBarChart data={dispData.monthlybudgetactual || []} />;

    tempDiv.id = tempDivId;
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "0px";
    tempDiv.style.top = "0px";

    tempDiv.style.width = "500px";
    tempDiv.style.height = "300px";

    // tempDiv.style.width = "1100px";
    // tempDiv.style.height = "800px";
    // // tempDiv.style.zIndex = "-99";
    // const clonedElement = printAreaRef.current!.cloneNode(
    //   true
    // ) as HTMLDivElement;
    // tempDiv.appendChild(clonedElement);
    // document.body.appendChild(tempDiv);

    root.render(a);
    document.body.appendChild(tempDiv);

    // const node = document.getElementById("printArea");
    const imgStr = await htmlToImage.toPng(tempDiv);
    update(<OverviewPdf str={imgStr} />);
  };

  return (
    <>
      <button type="button" onClick={handleOnClickAsync}>
        PDF印刷
      </button>
      <div ref={printAreaRef} id="printArea">
        <S.divUriageRow>
          <UriageCard
            data={[
              { name: "hontai", value: dispData.monthlyAchievementlevel ?? 0 },
              {
                name: "sonota",
                value: 100 - (dispData.monthlyAchievementlevel ?? 0),
              },
            ]}
            cardinfo={{
              ...Object.values(
                CardInfo.find((x) => x.cardinfo.kbn == "day")!
              )[0],
              toplabel: `${dispData.dayTotalSales?.toLocaleString()}円`,
              bottomlabel: `前営比(${
                (dispData.previousdayChange ?? 0) > 0 ? "+" : ""
              }${dispData.previousdayChange?.toLocaleString()})`,
              insideBottomLabel: `${dispData.monthlyAchievementlevel}%`,
            }}
            width={cardsize.width}
            height={cardsize.height}
          />
          <UriageCard
            data={[
              { name: "hontai", value: dispData.annualAchievementlevel ?? 0 },
              {
                name: "sonota",
                value: 100 - (dispData.annualAchievementlevel ?? 0),
              },
            ]}
            cardinfo={{
              ...Object.values(
                CardInfo.find((x) => x.cardinfo.kbn == "month")!
              )[0],
              toplabel: `${dispData.monthTotalSales?.toLocaleString()}円`,
              bottomlabel: `前月比(${
                (dispData.monthlyChange ?? 0) > 0 ? "+" : ""
              }${dispData.monthlyChange?.toLocaleString()})`,
              insideBottomLabel: `${dispData.annualAchievementlevel}%`,
            }}
            width={cardsize.width}
            height={cardsize.height}
          />
          <S.divCard>
            <div style={{ height: 250 }}>
              <h3>予実績</h3>
              <GraphBarChart data={dispData.monthlybudgetactual || []} />
            </div>
          </S.divCard>
        </S.divUriageRow>

        <S.divUriageProductCardRow>
          <div>
            <div className="card-1">
              <h3>本日の売上TOP3</h3>
              {dispData.topProductsToday?.map((x, index) => (
                <TopLine
                  key={x[0]}
                  order={index + 1}
                  item={x[0]}
                  price={x[1]}
                />
              ))}
            </div>
            <div className="card-2">
              <h3>直近{dispBussinessSpan.toString()}営業日の売上TOP3</h3>
              {dispData.topProductsByPeriod?.map((x, index) => (
                <TopLine
                  key={x[0]}
                  order={index + 1}
                  item={x[0]}
                  price={x[1]}
                />
              ))}
            </div>
          </div>
          <div className="card-3">
            <GraphMixBarChart
              data={
                dispData.mixeddatabyproduct?.slice(0, dispBussinessSpan) || []
              }
              color={fruitbgcolor}
            />
          </div>
        </S.divUriageProductCardRow>
      </div>
    </>
  );
};

export default Overview;
