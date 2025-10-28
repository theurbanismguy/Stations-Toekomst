import { useMemo } from "react";
import { parseStationData, getStationStats } from "@/lib/stationData";
import { StatsCard } from "@/components/StatsCard";
import { StationTable } from "@/components/StationTable";
import { BVOCharts } from "@/components/BVOCharts";
import { Train, Home, Briefcase, Building2, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const stationData = useMemo(() => parseStationData(), []);
  const stats = useMemo(() => getStationStats(stationData), [stationData]);

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

        {/* Tabs for Charts and Table */}
        <Tabs defaultValue="charts" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="charts">Visualisaties</TabsTrigger>
            <TabsTrigger value="table">Data Tabel</TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-6">
            <BVOCharts data={stationData} />
          </TabsContent>

          <TabsContent value="table">
            <StationTable data={stationData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
