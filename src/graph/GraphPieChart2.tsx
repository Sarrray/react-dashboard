import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type GraphPieChart2Props = {
  Name: string;
  Value: number | undefined;
}[];

// const margin = { top: 30, right: 30, bottom: 30, left: 30 };
const margin = { top: 0, right: 0, bottom: 0, left: 0 };
// const COLORS = ["#ff5050", "#00468b", "#0071bc", "#ff8f86", "#00215d"];
const COLORS = [
  "#30005d",
  "#a300b4",
  "#e03ca6",
  "#ff6894",
  "#ff9195",
  "#ffc1bb",
];

const GraphPieChart2 = ({ data }: { data: GraphPieChart2Props }) => {
  return (
    <>
      <ResponsiveContainer>
        <PieChart margin={margin}>
          <Pie
            data={data
              .filter(
                (x) => x.Name && (x.Value ?? 0) != 0 && !isNaN(x.Value ?? 0)
              )
              .map((x, index) => ({
                Name: x.Name,
                Value: Number(x.Value),
                Color: COLORS[index] ?? "#aaa",
              }))}
            dataKey="Value"
            label={renderCustomizedLabel}
            labelLine={false}
            startAngle={90}
            endAngle={-270}
            isAnimationActive={false}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index] ?? "#aaa"} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

type renderCustomizedLabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  Name: string;
  Color: string;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  Name,
  Color,
}: renderCustomizedLabelProps) => {
  const RADIAN = Math.PI / 180;
  let radius = 0;
  if (Name == "Other") {
    radius = outerRadius * 1.1;
  } else {
    radius = outerRadius * innerRadius + (outerRadius - innerRadius) * 0.5;
  }
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <text
        x={x}
        y={y < cx ? y : y + 20}
        fill={getContrastColor(Color)}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <text
        x={x}
        y={y < cx ? y - 20 : y}
        fill={getContrastColor(Color)}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {Name}
      </text>
    </>
  );
};

const getContrastColor = (backgroundColor: string): string => {
  // hex to RGB
  const hex = backgroundColor.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // 明度の計算（簡易版）
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // return brightness > 128 ? "#000000" : "#EEEEEE";
  return brightness > 150 ? "#000000" : "#EEEEEE";
};

export default GraphPieChart2;
