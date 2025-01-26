import * as S from "./Style";
import { TSummary } from "../../hooks/useSalesSummary";
import UriageCard from "./UriageCard";
import { CardInfo, cardsize } from "./UriageCardInfo";
import GraphBarChart from "../graph/GraphBarChart";
import GraphMixBarChart from "../graph/GraphMixBarChart";

import fruitbgcolor from "../../data/fruitbgcolor.json";
import { TopLine } from "./TopSales";

export type OverviewPrintAreaProps = {
  salesSummary: { [key in TSummary]: any };
};

const OverviewPrintArea = ({ salesSummary }: OverviewPrintAreaProps) => {
  return (
    <>
      <S.divUriageRow>
        <UriageCard
          value={salesSummary.月間の売上達成度}
          cardinfo={{
            ...Object.values(CardInfo.find((x) => x.cardinfo.kbn == "day")!)[0],
            toplabel: `${
              salesSummary.本日の総売上高?.toLocaleString() ?? ""
            }円`,
            bottomlabel: `前営比(${
              (salesSummary.前営業日との売上高の差分 ?? 0) > 0 ? "+" : ""
            }${salesSummary.前営業日との売上高の差分?.toLocaleString() ?? ""})`,
            insideBottomLabel: `${salesSummary.月間の売上達成度 ?? ""}%`,
          }}
          width={cardsize.width}
          height={cardsize.height}
        />
        <UriageCard
          value={salesSummary.年間の売上達成度}
          cardinfo={{
            ...Object.values(
              CardInfo.find((x) => x.cardinfo.kbn == "month")!
            )[0],
            toplabel: `${
              salesSummary.当月の総売上高?.toLocaleString() ?? ""
            }円`,
            bottomlabel: `前月比(${
              (salesSummary.前月との売上高の差分 ?? 0) > 0 ? "+" : ""
            }${salesSummary.前月との売上高の差分?.toLocaleString() ?? ""})`,
            insideBottomLabel: `${salesSummary.年間の売上達成度 ?? ""}%`,
          }}
          width={cardsize.width}
          height={cardsize.height}
        />
        <S.divCard>
          <div style={{ height: 270 }}>
            <h3>予実績</h3>
            <GraphBarChart data={salesSummary.当年の予実績 || []} />
          </div>
        </S.divCard>
      </S.divUriageRow>

      <S.divUriageProductCardRow>
        <div className="card-3">
          <GraphMixBarChart
            data={salesSummary.n日間の商品毎の売上高 || []}
            color={fruitbgcolor}
          />
        </div>
        <div>
          <div className="card-1">
            <h3>本日の売上TOP3</h3>
            {salesSummary.本日の売上高上位の商品?.map(
              (x: [string, number], index: number) => (
                <TopLine
                  key={x[0]}
                  order={index + 1}
                  item={x[0]}
                  price={x[1]}
                />
              )
            )}
          </div>
          <div className="card-2">
            <h3>直近{5}営業日の売上TOP3</h3>
            {salesSummary.n日間の売上高上位の商品?.map(
              (x: [string, number], index: number) => (
                <TopLine
                  key={x[0]}
                  order={index + 1}
                  item={x[0]}
                  price={x[1]}
                />
              )
            )}
          </div>
        </div>
      </S.divUriageProductCardRow>
    </>
  );
};

export default OverviewPrintArea;
