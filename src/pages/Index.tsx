import { useMemo, useState } from "react";
import { parseStationData, getStationStats } from "@/lib/stationData";
import { StatsCard } from "@/components/StatsCard";
import { StationTable } from "@/components/StationTable";
import { AllStationsDonut } from "@/components/AllStationsDonut";
import { Top10Chart } from "@/components/Top10Chart";
import { ComparisonChart } from "@/components/ComparisonChart";
import { ViewToggle, ViewType } from "@/components/ViewToggle";
import { Train, Home, Briefcase, Building2, TrendingUp } from "lucide-react";

const Index = () => {
  const stationData = useMemo(() => parseStationData(), []);
  const stats = useMemo(() => getStationStats(stationData), [stationData]);
  const [currentView, setCurrentView] = useState<ViewType>("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Train className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              NS Stations BVO Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Bereikbaarheid binnen 15 minuten lopen van elk station in Nederland
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8">
          <StatsCard
            title="Totaal Stations"
            value={stats.totalStations}
            icon={Train}
            subtitle="In Nederland"
          />
          <StatsCard
            title="Gemiddeld Wonen"
            value={stats.avgWoon}
            icon={Home}
            subtitle="m² BVO"
          />
          <StatsCard
            title="Gemiddeld Werken"
            value={stats.avgWerk}
            icon={Briefcase}
            subtitle="m² BVO"
          />
          <StatsCard
            title="Gemiddeld Voorzieningen"
            value={stats.avgVoorzieningen}
            icon={Building2}
            subtitle="m² BVO"
          />
          <StatsCard
            title="Top Station"
            value={stats.topStation.name}
            icon={TrendingUp}
            subtitle={`${stats.topStation.total.toLocaleString("nl-NL")} m²`}
          />
        </div>

        {/* View Toggle */}
        <div className="mb-8">
          <ViewToggle value={currentView} onValueChange={setCurrentView} />
        </div>

        {/* Content Area */}
        <div className="animate-in fade-in duration-300">
          {currentView === "overview" && <AllStationsDonut data={stationData} />}
          {currentView === "top10" && <Top10Chart data={stationData} />}
          {currentView === "compare" && <ComparisonChart data={stationData} />}
          {currentView === "table" && <StationTable data={stationData} />}
        </div>
      </div>
    </div>
  );
};

export default Index;
