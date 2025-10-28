import { useMemo, useState } from "react";
import { parseStationData, getStationStats, TransportMode } from "@/lib/stationData";
import { StationAreaControl } from "@/components/StationAreaControl";
import { StationTable } from "@/components/StationTable";
import { StationGrid } from "@/components/StationGrid";
import { TopBottomChart } from "@/components/TopBottomChart";
import { ComparisonChart } from "@/components/ComparisonChart";
import { ViewToggle, ViewType } from "@/components/ViewToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Index = () => {
  const { t } = useLanguage();
  const [transportMode, setTransportMode] = useState<TransportMode>("walk");
  const [currentView, setCurrentView] = useState<ViewType>("overview");
  
  const stationData = useMemo(() => parseStationData(transportMode), [transportMode]);
  const stats = useMemo(() => getStationStats(stationData), [stationData]);

  const themes = [
    { id: "netwerk", name: t('themes.network') },
    { id: "bereik", name: t('themes.reach') },
    { id: "programma", name: t('themes.program'), active: true },
    { id: "economie", name: t('themes.economy') },
    { id: "inclusie", name: t('themes.equity') },
    { id: "robuust", name: t('themes.resilience') },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Integrated Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-3 md:px-4 lg:px-8 py-4 md:py-6 lg:py-8">
          {/* Title + Language Toggle Row */}
          <div className="flex items-start justify-between mb-2">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight uppercase leading-none">
                {t('site.title')}
              </h1>
            </Link>
            <LanguageToggle />
          </div>
          
          {/* Subtitle */}
          <div className="text-sm md:text-base lg:text-lg text-muted-foreground mb-3">
            {t('site.subtitle')}
          </div>
          
          {/* Theme Navigation */}
          <TooltipProvider>
            <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
              {themes.map((theme, index) => (
                <span key={theme.id} className="flex items-center gap-2">
                  {theme.active ? (
                    <span className="text-accent font-bold border-b-2 border-accent uppercase text-xs md:text-sm tracking-wide">
                      {theme.name}
                    </span>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-muted-foreground cursor-not-allowed uppercase text-xs md:text-sm tracking-wide">
                          {theme.name}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('themes.comingSoon')}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {index < themes.length - 1 && (
                    <span className="text-muted-foreground text-xs">·</span>
                  )}
                </span>
              ))}
            </div>
          </TooltipProvider>
        </div>
      </div>

      {/* Station Area Control - Combined Question + Stats */}
      <StationAreaControl
        transportMode={transportMode}
        onTransportModeChange={setTransportMode}
        totalStations={stats.totalStations}
        totalWoon={stats.totalWoon}
        totalWerk={stats.totalWerk}
        totalVoorzieningen={stats.totalVoorzieningen}
        avgWoon={stats.avgWoon}
        avgWerk={stats.avgWerk}
        avgVoorzieningen={stats.avgVoorzieningen}
      />

      {/* Main Content */}
      <div className="container mx-auto px-3 md:px-4 lg:px-8 py-6 md:py-8">
        {/* View Toggle */}
        <div className="mb-6 md:mb-8">
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
