import { useLanguage } from "@/contexts/LanguageContext";
import { TransportMode } from "@/lib/stationData";
import { formatNumber } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Briefcase, Store } from "lucide-react";

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
      <div className="container mx-auto px-4 md:px-8 py-4 md:py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
          {/* Left: Question + Transport Mode Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
              {t('stationArea.question')}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-base md:text-lg text-muted-foreground">15 {t('stationArea.minutes')}</span>
              <Select value={transportMode} onValueChange={(value) => onTransportModeChange(value as TransportMode)}>
                <SelectTrigger className="w-28 md:w-32 font-semibold border-0 border-b-2 border-foreground rounded-none bg-transparent px-2 focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="walk">{t('stationArea.walking')}</SelectItem>
                  <SelectItem value="bike">{t('stationArea.biking')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right: Stats - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-right">
            <div>
              <div className="flex items-center justify-end gap-2 text-xl lg:text-2xl font-bold text-[hsl(var(--housing))] tabular-nums">
                <Home className="h-4 w-4" />
                {formatNumber(totalWoon)} m²
              </div>
              <div className="text-xs text-muted-foreground tabular-nums">
                Ø {formatNumber(avgWoon)} m²
              </div>
            </div>
            <div>
              <div className="flex items-center justify-end gap-2 text-xl lg:text-2xl font-bold text-[hsl(var(--work))] tabular-nums">
                <Briefcase className="h-4 w-4" />
                {formatNumber(totalWerk)} m²
              </div>
              <div className="text-xs text-muted-foreground tabular-nums">
                Ø {formatNumber(avgWerk)} m²
              </div>
            </div>
            <div>
              <div className="flex items-center justify-end gap-2 text-xl lg:text-2xl font-bold text-[hsl(var(--facilities))] tabular-nums">
                <Store className="h-4 w-4" />
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
