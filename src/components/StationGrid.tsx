import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { StationData, calculateDonutScale } from "@/lib/stationData";
import { MiniDonut } from "./MiniDonut";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface StationGridProps {
  data: StationData[];
}

export const StationGrid = ({ data }: StationGridProps) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const maxTotal = useMemo(() => {
    return Math.max(...data.map((s) => s.total));
  }, [data]);

  const filteredStations = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((station) =>
      station.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('chart.allStations')} {data.length} {t('stats.stations')}</CardTitle>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('chart.searchStation')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          {filteredStations.length} {filteredStations.length === 1 ? t('chart.stationFound') : t('chart.stationsFound')}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredStations.map((station) => {
            const scale = calculateDonutScale(station.total, maxTotal);
            return (
              <MiniDonut key={station.name} station={station} size={scale} />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
