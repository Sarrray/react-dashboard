import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomeLegend from "./CustomeLegend";
import CustomTooltip from "./CustomTooltip";

type GraphMixBarChartProps = {
  data: Record<string, string | number>[];
  color: Record<string, string>;
};
const GraphMixBarChart = ({ data, color }: GraphMixBarChartProps) => {
  const product1: string[] = [];
  data.forEach((x) => product1.push(...Object.keys(x)));
  const product2 = [...new Set(product1)];
  const products = product2.filter((x) => x !== "date");

  return (
    <>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            dataKey="date"
            tickFormatter={(tick) =>
              `${Number(tick.slice(4, 6))}/${Number(tick.slice(6, 8))}`
            }
            angle={-45}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: "14px" }}
            stroke="black"
          />
          <YAxis stroke="black" />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomeLegend />} />
          {products
            .sort((a, b) => {
              if (a == "その他") return 1;
              if (b == "その他") return -1;
              return a.localeCompare(b);
            })
            .map((x) => (
              <Bar
                key={x}
                dataKey={x}
                stackId="g"
                fill={color[x] ?? "ff0000"}
                maxBarSize={50}
              />
            ))}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default GraphMixBarChart;
