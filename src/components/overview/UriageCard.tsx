import { Label } from "recharts";
import GraphPieChart from "../../graph/GraphPieChart";
import * as S from "./Style";

type UriageCardProps = GraphdataType &
  CardInfoType & { width: number; height: number };

type GraphdataType = { data: { name: string; value: number }[] };
export type CardInfoType = {
  cardinfo: {
    kbn: "day" | "month";
    title: string;
    toplabel: string;
    bottomlabel: string;
    colors: string[];
    insideTopLabel: string;
    insideBottomLabel: string;
  };
};

type UriagePieChartProps = GraphdataType & {
  insideTopLabel: string;
  insideBottomLabel: string;
  colors: string[];
};

const UriageCard = ({ data, cardinfo }: UriageCardProps) => {
  return (
    <>
      <S.divSalesCard>
        <div className="item1">
          <div>
            <h3>{cardinfo.title} </h3>
          </div>
        </div>
        <div className="item2">{cardinfo.toplabel}</div>
        <div className="item3">{cardinfo.bottomlabel}</div>
        <div className="item4">
          <UriagePieChart
            data={data}
            insideTopLabel={cardinfo.insideTopLabel}
            insideBottomLabel={cardinfo.insideBottomLabel}
            colors={cardinfo.colors}
          />
        </div>
      </S.divSalesCard>
    </>
  );
};

const UriagePieChart = ({
  data,
  insideTopLabel,
  insideBottomLabel,
  colors,
}: UriagePieChartProps) => {
  const size = 170;
  return (
    <>
      <GraphPieChart
        data={data}
        colors={colors}
        size={size}
        insideLabel={
          <>
            <Label
              value={insideTopLabel}
              position="centerTop"
              fontSize="0.9rem"
              style={{ transform: "translateY(-20px)" }}
              fill="#666"
            />
            <Label
              value={insideBottomLabel}
              position="centerBottom"
              fontSize="1.2rem"
              style={{ transform: "translateY(25px)" }}
              fill="#666"
            />
          </>
        }
      />
    </>
  );
};

export default UriageCard;
