import { useMemo, useState } from "react";
import { parseStationData, getStationStats } from "@/lib/stationData";
import { CompactStatsBar } from "@/components/CompactStatsBar";
import { StationTable } from "@/components/StationTable";
import { StationGrid } from "@/components/StationGrid";
import { TopBottomChart } from "@/components/TopBottomChart";
import { ComparisonChart } from "@/components/ComparisonChart";
import { ViewToggle, ViewType } from "@/components/ViewToggle";
import { Train } from "lucide-react";

const Index = () => {
  const stationData = useMemo(() => parseStationData(), []);
  const stats = useMemo(() => getStationStats(stationData), [stationData]);
  const [currentView, setCurrentView] = useState<ViewType>("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-accent/10">
              <Train className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Stations.Toekomst
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Inzicht in het Nederlandse spoorwegsysteem
          </p>
        </div>
      </div>

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
