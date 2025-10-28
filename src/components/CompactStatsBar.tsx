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
  return (
    <div className="border-b bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          {/* Total Stations */}
          <div className="flex items-center gap-2">
            <Train className="h-4 w-4 text-accent" />
            <span className="font-semibold">{totalStations}</span>
            <span className="text-muted-foreground">stations</span>
          </div>

          {/* Total BVOs */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-[hsl(var(--housing))]" />
              <div className="flex flex-col">
                <span className="font-semibold text-[hsl(var(--housing))]">
                  {totalWoon.toLocaleString("nl-NL")} m²
                </span>
                <span className="text-xs text-muted-foreground">
                  Ø {avgWoon.toLocaleString("nl-NL")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-[hsl(var(--work))]" />
              <div className="flex flex-col">
                <span className="font-semibold text-[hsl(var(--work))]">
                  {totalWerk.toLocaleString("nl-NL")} m²
                </span>
                <span className="text-xs text-muted-foreground">
                  Ø {avgWerk.toLocaleString("nl-NL")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[hsl(var(--facilities))]" />
              <div className="flex flex-col">
                <span className="font-semibold text-[hsl(var(--facilities))]">
                  {totalVoorzieningen.toLocaleString("nl-NL")} m²
                </span>
                <span className="text-xs text-muted-foreground">
                  Ø {avgVoorzieningen.toLocaleString("nl-NL")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
