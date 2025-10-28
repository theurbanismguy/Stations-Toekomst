import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { StationData, getTopBottomStations } from "@/lib/stationData";
import { MiniDonut } from "./MiniDonut";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TopBottomChartProps {
  data: StationData[];
}

export const TopBottomChart = ({ data }: TopBottomChartProps) => {
  const { t } = useLanguage();
  const { top, bottom } = useMemo(() => getTopBottomStations(data, 10), [data]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Top 10 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            {t('chart.top10')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {top.map((station, index) => (
              <div key={station.name} className="relative">
                <div className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {index + 1}
                </div>
                <MiniDonut station={station} size={110} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom 10 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-muted-foreground" />
            {t('chart.bottom10')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {bottom.map((station, index) => (
              <div key={station.name} className="relative">
                <div className="absolute top-2 left-2 z-10 bg-muted text-muted-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {index + 1}
                </div>
                <MiniDonut station={station} size={110} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
