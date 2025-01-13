import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomeLegend from "./CustomeLegend";
import CustomTooltip from "./CustomTooltip";
import { IBudgetActualData } from "../interfaces/interface";

type DataLabelType = Record<
  keyof IBudgetActualData,
  { label: string; unit?: string }
>;
const DisplayName: DataLabelType = {
  month: { label: "対象月" },
  budget: { label: "予算" },
  actual: { label: "実績" },
  goal: { label: "達成度", unit: "%" },
};

type GraphBarChartProps = { data: IBudgetActualData[] };
const GraphBarChart = ({ data }: GraphBarChartProps) => {
  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer style={{ color: "#000000" }}>
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 35,
              right: 10,
              bottom: 0,
              left: 50,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis
              dataKey="month"
              scale="band"
              tick={{ fill: "#000", fontSize: "0.9rem" }}
              angle={90}
              dy={20}
              tickFormatter={(x: string) => `${Number(x.substring(4, 6))}月`}
            />
            <YAxis
              orientation="left"
              label={{
                value: "売上金額 (円)",
                angle: -90,
                position: "insideLeft",
                offset: -30,
                dy: 40,
                fill: "#000000",
              }}
              tick={{ fill: "#000", fontSize: "0.9rem" }}
            />
            <YAxis
              orientation="right"
              yAxisId="goal"
              label={{
                value: "達成度 (%)",
                angle: 90,
                position: "insideRight",
                offset: 5, // 水平方向の調整
                dy: 40, // 垂直方向の調整
                fill: "#000000",
              }}
              tick={{ fill: "#000000", fontSize: "0.9rem" }}
            />
            <Tooltip
              content={
                <CustomTooltip
                  displayname={DisplayName}
                  labelformat="yyyy年mm月"
                />
              }
            />
            <Legend
              content={<CustomeLegend displayname={DisplayName} />}
              wrapperStyle={{ paddingTop: 5 }}
            />
            <Bar dataKey="budget" stackId={"a"} barSize={20} fill="#a1a8a0" />
            <Bar dataKey="actual" stackId={"b"} barSize={20} fill="#77ac50" />
            <Line
              type="monotone"
              strokeWidth={3}
              dataKey="goal"
              stroke="#f39c12"
              yAxisId="goal"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default GraphBarChart;
