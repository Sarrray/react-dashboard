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
import { useEffect, useState } from "react";
import { usePDF } from "@react-pdf/renderer";
import OverviewPdf from "./OverviewPdf";
import { createRoot } from "react-dom/client";
import {
  KijunbiProvider,
  useKijunbiContext,
} from "../../contexts/KijunbiContextProvider";

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

const Overview = () => {
  const { kijunbi } = useKijunbiContext();

  return (
    <S.divOverView>
      <div>
        基準日：
        {`${kijunbi.substring(0, 4)}年${Number(
          kijunbi.substring(4, 6)
        )}月${Number(kijunbi.substring(6, 8))}日`}
      </div>
      <div>
        <PrintButton />
      </div>
      <div>
        <Overview2 />
      </div>
      ※予実績と売上のグラフはマウスホバーで詳細を表示
    </S.divOverView>
  );
};

const Overview2 = () => {
  const { kijunbi } = useKijunbiContext();
  const { dispData } = useSales(salesdata, budge, dispBussinessSpan, kijunbi);

  return (
    <>
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
            ...Object.values(CardInfo.find((x) => x.cardinfo.kbn == "day")!)[0],
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
          <div style={{ height: 270 }}>
            <h3>予実績</h3>
            <GraphBarChart data={dispData.monthlybudgetactual || []} />
          </div>
        </S.divCard>
      </S.divUriageRow>

      <S.divUriageProductCardRow>
        <div className="card-3">
          <GraphMixBarChart
            data={
              dispData.mixeddatabyproduct?.slice(0, dispBussinessSpan) || []
            }
            color={fruitbgcolor}
          />
        </div>
        <div>
          <div className="card-1">
            <h3>本日の売上TOP3</h3>
            {dispData.topProductsToday?.map((x, index) => (
              <TopLine key={x[0]} order={index + 1} item={x[0]} price={x[1]} />
            ))}
          </div>
          <div className="card-2">
            <h3>直近{dispBussinessSpan.toString()}営業日の売上TOP3</h3>
            {dispData.topProductsByPeriod?.map((x, index) => (
              <TopLine key={x[0]} order={index + 1} item={x[0]} price={x[1]} />
            ))}
          </div>
        </div>
      </S.divUriageProductCardRow>
    </>
  );
};

export const PrintButton = () => {
  const [pdfflg, setPdfflg] = useState(false);
  const [pdf, update] = usePDF({ document: <></> });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (pdfflg && pdf.url) {
      window.open(pdf.url ?? "", "_blank");
    }
    setPdfflg(false);
    update(<></>);
  }, [pdf.url]);

  const handleOnClickAsync = async () => {
    setIsLoading(true);
    setPdfflg(true);
    const tempDiv = document.createElement("div");
    const root = createRoot(tempDiv);

    tempDiv.style.position = "absolute";
    tempDiv.style.left = "0px";
    tempDiv.style.top = "0px";

    tempDiv.style.width = "1100px";
    tempDiv.style.height = "800px";
    tempDiv.style.zIndex = "-99";

    root.render(
      <KijunbiProvider>
        <Overview2 />
      </KijunbiProvider>
    );
    document.body.appendChild(tempDiv);
    await waitForRendering();
    const sleep = (time: number) =>
      new Promise<void>((r) => setTimeout(r, time));
    await sleep(2000);

    const imgStr = await htmlToImage.toPng(tempDiv);
    update(<OverviewPdf str={imgStr} />);

    root.unmount();
    tempDiv.remove();

    setIsLoading(false);
  };

  const waitForRendering = () => {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resolve(null);
        });
      });
    });
  };

  return (
    <>
      <S.buttonOutputPDF
        type="button"
        disabled={isLoading}
        onClick={handleOnClickAsync}
      >
        {isLoading ? "PDF出力中" : "PDF出力"}
      </S.buttonOutputPDF>
    </>
  );
};

export default Overview;
