import { useLanguage } from "@/contexts/LanguageContext";
import { TransportMode } from "@/lib/stationData";
import { formatNumber } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StationAreaControlProps {
  transportMode: TransportMode;
  onTransportModeChange: (mode: TransportMode) => void;
  totalStations: number;
  totalWoon: number;
  totalWerk: number;
  totalVoorzieningen: number;
  avgWoon: number;
  avgWerk: number;
  avgVoorzieningen: number;
}

export const StationAreaControl = ({
  transportMode,
  onTransportModeChange,
  totalStations,
  totalWoon,
  totalWerk,
  totalVoorzieningen,
  avgWoon,
  avgWerk,
  avgVoorzieningen,
}: StationAreaControlProps) => {
  const { t } = useLanguage();

  return (
    <div className="border-y bg-muted/20">
      <div className="container mx-auto px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Left: Question + Transport Mode Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
              {t('stationArea.question')}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-lg text-muted-foreground">15 {t('stationArea.minutes')}</span>
              <Select value={transportMode} onValueChange={(value) => onTransportModeChange(value as TransportMode)}>
                <SelectTrigger className="w-32 font-semibold border-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="walk">{t('stationArea.walking')}</SelectItem>
                  <SelectItem value="bike">{t('stationArea.biking')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="flex items-center gap-8 text-right">
            <div>
              <div className="text-3xl font-bold tabular-nums">{totalStations}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">{t('stats.stations')}</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <div className="text-2xl font-bold text-[hsl(var(--housing))] tabular-nums">
                {formatNumber(totalWoon)} m²
              </div>
              <div className="text-xs text-muted-foreground tabular-nums">
                Ø {formatNumber(avgWoon)} m²
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[hsl(var(--work))] tabular-nums">
                {formatNumber(totalWerk)} m²
              </div>
              <div className="text-xs text-muted-foreground tabular-nums">
                Ø {formatNumber(avgWerk)} m²
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[hsl(var(--facilities))] tabular-nums">
                {formatNumber(totalVoorzieningen)} m²
              </div>
              <div className="text-xs text-muted-foreground tabular-nums">
                Ø {formatNumber(avgVoorzieningen)} m²
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
