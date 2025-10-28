import { StationData } from "@/lib/stationData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BVOChartsProps {
  data: StationData[];
}

export const BVOCharts = ({ data }: BVOChartsProps) => {
  // Top 10 stations by total BVO
  const top10Stations = [...data]
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  // Distribution by size
  const sizeDistribution = data.reduce((acc, station) => {
    acc[station.size] = (acc[station.size] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sizeData = Object.entries(sizeDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  // Scatter plot data (top 30 for readability)
  const scatterData = [...data]
    .sort((a, b) => b.total - a.total)
    .slice(0, 30)
    .map((s) => ({
      name: s.name,
      werk: s.werk,
      woon: s.woon,
      total: s.total,
    }));

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Top 10 Stations - Totaal BVO Bereikbaarheid</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={top10Stations}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                stroke="hsl(var(--foreground))"
              />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              <Bar dataKey="woon" fill="hsl(var(--chart-1))" name="Wonen" />
              <Bar dataKey="werk" fill="hsl(var(--chart-2))" name="Werken" />
              <Bar
                dataKey="voorzieningen"
                fill="hsl(var(--chart-3))"
                name="Voorzieningen"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Werk vs Wonen (Top 30 Stations)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="werk"
                name="Werk BVO"
                type="number"
                stroke="hsl(var(--foreground))"
              />
              <YAxis
                dataKey="woon"
                name="Woon BVO"
                type="number"
                stroke="hsl(var(--foreground))"
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Scatter
                data={scatterData}
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Verdeling Stationstypes</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={sizeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name} (${entry.value})`}
                outerRadius={100}
                fill="hsl(var(--primary))"
                dataKey="value"
              >
                {sizeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
