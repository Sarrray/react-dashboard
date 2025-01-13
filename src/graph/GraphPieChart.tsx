import { PieChart, Pie, Cell } from "recharts";

type GraphPieChartProps = {
  data: { name: string; value: number }[];
  colors: string[];
  size: number;
  insideLabel: JSX.Element;
};

const GraphPieChart = ({
  data,
  colors,
  size,
  insideLabel,
}: GraphPieChartProps) => {
  return (
    <>
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          cx={size / 2}
          cy={size / 2}
          innerRadius={"80%"}
          outerRadius={"100%"}
          paddingAngle={0}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
          {insideLabel}
        </Pie>
      </PieChart>
    </>
  );
};

export default GraphPieChart;
