import { useLanguage } from "@/contexts/LanguageContext";
import { formatNumber } from "@/lib/utils";
import { Train, Home, Briefcase, Building2 } from "lucide-react";

interface CompactStatsBarProps {
  totalStations: number;
  totalWoon: number;
  totalWerk: number;
  totalVoorzieningen: number;
  avgWoon: number;
  avgWerk: number;
  avgVoorzieningen: number;
}

export const CompactStatsBar = ({
  totalStations,
  totalWoon,
  totalWerk,
  totalVoorzieningen,
  avgWoon,
  avgWerk,
  avgVoorzieningen,
}: CompactStatsBarProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="border-b bg-card/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          {/* Total Stations */}
          <div className="flex items-center gap-2">
            <Train className="h-4 w-4 text-accent" />
            <span className="font-semibold tabular-nums">{totalStations}</span>
            <span className="text-muted-foreground">{t('stats.stations')}</span>
          </div>

          {/* Total BVOs */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-[hsl(var(--housing))]" />
              <div className="flex flex-col">
                <span className="font-semibold text-[hsl(var(--housing))] tabular-nums">
                  {formatNumber(totalWoon)} m²
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  Ø {formatNumber(avgWoon)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-[hsl(var(--work))]" />
              <div className="flex flex-col">
                <span className="font-semibold text-[hsl(var(--work))] tabular-nums">
                  {formatNumber(totalWerk)} m²
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  Ø {formatNumber(avgWerk)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[hsl(var(--facilities))]" />
              <div className="flex flex-col">
                <span className="font-semibold text-[hsl(var(--facilities))] tabular-nums">
                  {formatNumber(totalVoorzieningen)} m²
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  Ø {formatNumber(avgVoorzieningen)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
