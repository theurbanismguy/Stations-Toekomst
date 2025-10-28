import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StationData } from "@/lib/stationData";
import { StationSelector } from "./StationSelector";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useNavigate } from "react-router-dom";
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
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
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

  const formatAxisInMillions = (value: number) => {
    if (value === 0) return '';
    return `${(value / 1_000_000).toFixed(1)}M`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('chart.workGfa')} vs. {t('chart.housingGfa')}</CardTitle>
        <div className="mt-4">
          <StationSelector
            data={data}
            selectedStations={selectedStations}
            onSelectionChange={setSelectedStations}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={isMobile ? 400 : 500}>
          <ScatterChart
            margin={{ 
              top: 20, 
              right: isMobile ? 10 : 20, 
              bottom: isMobile ? 60 : 80, 
              left: isMobile ? 80 : 100 
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name={t('chart.workGfa')}
              tick={{ fill: "hsl(var(--foreground))" }}
              tickFormatter={formatAxisInMillions}
            >
              <Label 
                value={`${t('chart.workGfa')} (${t('chart.millionSqm')})`}
                position="bottom" 
                offset={20}
                style={{ fill: "hsl(var(--work))", fontWeight: 600 }}
              />
            </XAxis>
            <YAxis 
              type="number" 
              dataKey="y" 
              name={t('chart.housingGfa')}
              tick={{ fill: "hsl(var(--foreground))" }}
              tickFormatter={formatAxisInMillions}
            >
              <Label 
                value={`${t('chart.housingGfa')} (${t('chart.millionSqm')})`}
                angle={-90} 
                position="left"
                offset={30}
                style={{ fill: "hsl(var(--housing))", fontWeight: 600, textAnchor: 'middle' }}
              />
            </YAxis>
            <ZAxis type="number" dataKey="z" range={[100, 1000]} name={t('chart.totalGfa')} />
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
                          {t('chart.workGfa')}: {data.x.toLocaleString("nl-NL")} m²
                        </p>
                        <p className="text-[hsl(var(--housing))]">
                          {t('chart.housingGfa')}: {data.y.toLocaleString("nl-NL")} m²
                        </p>
                        <p className="text-muted-foreground">
                          {t('chart.totalGfa')}: {data.z.toLocaleString("nl-NL")} m²
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
              cursor="pointer"
              onClick={(data: any) => {
                if (data && data.name) {
                  navigate(`/station/${encodeURIComponent(data.name)}`);
                }
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
