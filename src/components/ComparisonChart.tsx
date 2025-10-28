import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StationData } from "@/lib/stationData";
import { StationSelector } from "./StationSelector";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

interface ComparisonChartProps {
  data: StationData[];
}

export const ComparisonChart = ({ data }: ComparisonChartProps) => {
  // Default: top 10 stations
  const defaultStations = useMemo(() => {
    return [...data]
      .sort((a, b) => b.total - a.total)
      .slice(0, 10)
      .map((s) => s.name);
  }, [data]);

  const [selectedStations, setSelectedStations] = useState<string[]>(defaultStations);

  const scatterData = useMemo(() => {
    const filtered = selectedStations.length > 0
      ? data.filter((s) => selectedStations.includes(s.name))
      : data;

    return filtered.map((station) => ({
      x: station.werk,
      y: station.woon,
      z: station.total,
      name: station.name,
    }));
  }, [data, selectedStations]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Werken vs. Wonen Vergelijking</CardTitle>
        <div className="mt-4">
          <StationSelector
            data={data}
            selectedStations={selectedStations}
            onSelectionChange={setSelectedStations}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={500}>
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 70, left: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Werken"
              tick={{ fill: "hsl(var(--foreground))" }}
            >
              <Label 
                value="Werken BVO (m²)" 
                position="bottom" 
                offset={10}
                style={{ fill: "hsl(var(--work))", fontWeight: 600 }}
              />
            </XAxis>
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Wonen"
              tick={{ fill: "hsl(var(--foreground))" }}
            >
              <Label 
                value="Wonen BVO (m²)" 
                angle={-90} 
                position="insideLeft"
                offset={10}
                style={{ fill: "hsl(var(--housing))", fontWeight: 600 }}
              />
            </YAxis>
            <ZAxis type="number" dataKey="z" range={[100, 1000]} name="Totaal" />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background border-2 border-accent rounded-lg p-3 shadow-lg z-50">
                      <p className="font-semibold text-sm mb-2 text-accent">{data.name}</p>
                      <div className="text-xs space-y-1">
                        <p className="text-[hsl(var(--work))]">
                          Werken: {data.x.toLocaleString("nl-NL")} m²
                        </p>
                        <p className="text-[hsl(var(--housing))]">
                          Wonen: {data.y.toLocaleString("nl-NL")} m²
                        </p>
                        <p className="text-muted-foreground">
                          Totaal: {data.z.toLocaleString("nl-NL")} m²
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter
              data={scatterData}
              fill="hsl(var(--accent))"
              fillOpacity={0.7}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
