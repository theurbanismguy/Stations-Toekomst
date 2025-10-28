import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts";
import { StationData } from "@/lib/stationData";

interface ComparisonChartProps {
  data: StationData[];
}

export const ComparisonChart = ({ data }: ComparisonChartProps) => {
  const scatterData = [...data]
    .sort((a, b) => b.total - a.total)
    .slice(0, 30)
    .map((station) => ({
      name: station.name,
      werk: station.werk,
      woon: station.woon,
      total: station.total,
    }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Werken vs. Wonen - Top 30 Stations</CardTitle>
        <p className="text-muted-foreground">
          Vergelijking van werk en woon BVO bereikbaarheid
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                type="number"
                dataKey="werk"
                name="Werken"
                label={{ value: "Werken (m²)", position: "bottom", fill: "hsl(var(--foreground))" }}
                tick={{ fill: "hsl(var(--foreground))" }}
              />
              <YAxis
                type="number"
                dataKey="woon"
                name="Wonen"
                label={{ value: "Wonen (m²)", angle: -90, position: "left", fill: "hsl(var(--foreground))" }}
                tick={{ fill: "hsl(var(--foreground))" }}
              />
              <ZAxis type="number" dataKey="total" range={[50, 400]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-card border border-border rounded-lg p-3">
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-sm" style={{ color: "hsl(var(--work))" }}>
                          Werken: {data.werk.toLocaleString("nl-NL")} m²
                        </p>
                        <p className="text-sm" style={{ color: "hsl(var(--housing))" }}>
                          Wonen: {data.woon.toLocaleString("nl-NL")} m²
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Totaal: {data.total.toLocaleString("nl-NL")} m²
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="Stations" data={scatterData} fill="hsl(var(--primary))" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
