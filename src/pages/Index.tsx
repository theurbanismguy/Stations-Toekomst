import { useMemo, useState } from "react";
import { parseStationData, getStationStats, TransportMode } from "@/lib/stationData";
import { CompactStatsBar } from "@/components/CompactStatsBar";
import { StationTable } from "@/components/StationTable";
import { StationGrid } from "@/components/StationGrid";
import { TopBottomChart } from "@/components/TopBottomChart";
import { ComparisonChart } from "@/components/ComparisonChart";
import { ViewToggle, ViewType } from "@/components/ViewToggle";
import { ThemeNavigation } from "@/components/ThemeNavigation";
import { TransportModeSelector } from "@/components/TransportModeSelector";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { Train } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();
  const [transportMode, setTransportMode] = useState<TransportMode>("walk");
  const [currentView, setCurrentView] = useState<ViewType>("overview");
  
  const stationData = useMemo(() => parseStationData(transportMode), [transportMode]);
  const stats = useMemo(() => getStationStats(stationData), [stationData]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b bg-card/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded bg-accent/10">
                <Train className="h-10 w-10 text-accent" />
              </div>
              <div>
                <h1 className="text-5xl font-bold tracking-tight">
                  {t('site.title')}
                </h1>
                <p className="text-lg text-muted-foreground mt-1">
                  {t('site.subtitle')}
                </p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Theme Navigation */}
      <ThemeNavigation />

      {/* Compact Stats Bar */}
      <CompactStatsBar
        totalStations={stats.totalStations}
        totalWoon={stats.totalWoon}
        totalWerk={stats.totalWerk}
        totalVoorzieningen={stats.totalVoorzieningen}
        avgWoon={stats.avgWoon}
        avgWerk={stats.avgWerk}
        avgVoorzieningen={stats.avgVoorzieningen}
      />

      {/* Transport Mode Selector */}
      <TransportModeSelector value={transportMode} onChange={setTransportMode} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* View Toggle */}
        <div className="mb-8">
          <ViewToggle value={currentView} onValueChange={setCurrentView} />
        </div>

        {/* Content Area */}
        <div className="animate-in fade-in duration-300">
          {currentView === "overview" && <StationGrid data={stationData} />}
          {currentView === "top10" && <TopBottomChart data={stationData} />}
          {currentView === "compare" && <ComparisonChart data={stationData} />}
          {currentView === "table" && <StationTable data={stationData} />}
        </div>
      </div>
    </div>
  );
};

export default Index;
