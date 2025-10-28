import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { StationData, getTopBottomStations } from "@/lib/stationData";
import { MiniDonut } from "./MiniDonut";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface TopBottomChartProps {
  data: StationData[];
}

export const TopBottomChart = ({ data }: TopBottomChartProps) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { top, bottom } = useMemo(() => getTopBottomStations(data, 10), [data]);
  const donutSize = isMobile ? 100 : 110;

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
      {/* Top 10 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-accent" />
            {t('chart.top10')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
            {top.map((station, index) => (
              <div key={station.name} className="relative">
                <div className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {index + 1}
                </div>
                <MiniDonut station={station} size={donutSize} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom 10 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <TrendingDown className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
            {t('chart.bottom10')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
            {bottom.map((station, index) => (
              <div key={station.name} className="relative">
                <div className="absolute top-2 left-2 z-10 bg-muted text-muted-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {index + 1}
                </div>
                <MiniDonut station={station} size={donutSize} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
