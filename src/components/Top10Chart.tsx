import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { StationData } from "@/lib/stationData";

interface Top10ChartProps {
  data: StationData[];
}

export const Top10Chart = ({ data }: Top10ChartProps) => {
  const top10 = [...data]
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)
    .map((station) => ({
      name: station.name,
      Wonen: station.woon,
      Werken: station.werk,
      Voorzieningen: station.voorzieningen,
    }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Top 10 Stations - BVO Verdeling</CardTitle>
        <p className="text-muted-foreground">
          De stations met de hoogste totale bereikbaarheid
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={top10} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fill: "hsl(var(--foreground))" }}
              />
              <YAxis tick={{ fill: "hsl(var(--foreground))" }} />
              <Tooltip
                formatter={(value: number) => `${value.toLocaleString("nl-NL")} m²`}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="Wonen" fill="hsl(var(--housing))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Werken" fill="hsl(var(--work))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Voorzieningen" fill="hsl(var(--facilities))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
