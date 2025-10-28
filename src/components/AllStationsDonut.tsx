import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { StationData } from "@/lib/stationData";

interface AllStationsDonutProps {
  data: StationData[];
}

export const AllStationsDonut = ({ data }: AllStationsDonutProps) => {
  const totalWoon = data.reduce((sum, s) => sum + s.woon, 0);
  const totalWerk = data.reduce((sum, s) => sum + s.werk, 0);
  const totalVoorzieningen = data.reduce((sum, s) => sum + s.voorzieningen, 0);

  const donutData = [
    { name: "Wonen", value: totalWoon, color: "hsl(var(--housing))" },
    { name: "Werken", value: totalWerk, color: "hsl(var(--work))" },
    { name: "Voorzieningen", value: totalVoorzieningen, color: "hsl(var(--facilities))" },
  ];

  const total = totalWoon + totalWerk + totalVoorzieningen;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Totale BVO Verdeling - Alle Stations</CardTitle>
        <p className="text-muted-foreground">
          Bereikbaarheid binnen 15 minuten lopen van 397 stations
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={2}
                dataKey="value"
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [
                  `${value.toLocaleString("nl-NL")} m²`,
                  "",
                ]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry: any) => {
                  const percentage = ((entry.payload.value / total) * 100).toFixed(1);
                  return `${value}: ${entry.payload.value.toLocaleString("nl-NL")} m² (${percentage}%)`;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">Totaal BVO</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-[hsl(var(--housing))] via-[hsl(var(--work))] to-[hsl(var(--facilities))] bg-clip-text text-transparent">
            {total.toLocaleString("nl-NL")} m²
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
