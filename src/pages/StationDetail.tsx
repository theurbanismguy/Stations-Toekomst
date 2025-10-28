import { useParams, useNavigate, Link } from "react-router-dom";
import { parseStationData } from "@/lib/stationData";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatNumber } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Train } from "lucide-react";
import { MiniDonut } from "@/components/MiniDonut";
import { LanguageToggle } from "@/components/LanguageToggle";

const StationDetail = () => {
  const { stationName } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const decodedName = stationName ? decodeURIComponent(stationName) : "";

  const walkData = parseStationData("walk");
  const bikeData = parseStationData("bike");

  const walkStation = walkData.find((s) => s.name === decodedName);
  const bikeStation = bikeData.find((s) => s.name === decodedName);

  if (!walkStation || !bikeStation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('chart.stationNotFound')}</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('station.backToDashboard')}
          </Button>
        </div>
      </div>
    );
  }

  const themes = [
    { id: "netwerk", name: t('themes.network'), active: false },
    { id: "bereik", name: t('themes.reach'), active: false },
    { id: "economie", name: t('themes.economy'), active: false },
    { id: "inclusie", name: t('themes.equity'), active: false },
    { id: "robuust", name: t('themes.resilience'), active: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/30">
        <div className="container mx-auto px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button onClick={() => navigate("/")} variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('station.backToDashboard')}
            </Button>
            <LanguageToggle />
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 rounded bg-accent/10">
              <Train className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight uppercase">
                {walkStation.name}
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                {walkStation.size} · {walkStation.type}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-12">
        {/* Programma Theme - Active */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl uppercase tracking-wide">{t('themes.program')}</CardTitle>
            <p className="text-muted-foreground">{t('station.stationAreaBVO')}</p>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Walking */}
              <div>
                <h3 className="text-xl font-bold mb-6 uppercase tracking-wide">
                  15 {t('stationArea.minutes')} {t('stationArea.walking')}
                </h3>
                <div className="flex items-start gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-baseline py-2 border-b">
                      <span className="text-muted-foreground">{t('chart.housing')}</span>
                      <span className="text-xl font-bold text-[hsl(var(--housing))] tabular-nums">
                        {formatNumber(walkStation.woon)} m²
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline py-2 border-b">
                      <span className="text-muted-foreground">{t('chart.work')}</span>
                      <span className="text-xl font-bold text-[hsl(var(--work))] tabular-nums">
                        {formatNumber(walkStation.werk)} m²
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline py-2 border-b">
                      <span className="text-muted-foreground">{t('chart.facilities')}</span>
                      <span className="text-xl font-bold text-[hsl(var(--facilities))] tabular-nums">
                        {formatNumber(walkStation.voorzieningen)} m²
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline py-3 border-t-2 mt-4">
                      <span className="font-bold">{t('chart.total')}</span>
                      <span className="text-2xl font-bold tabular-nums">
                        {formatNumber(walkStation.total)} m²
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <MiniDonut station={walkStation} size={200} />
                  </div>
                </div>
              </div>

              {/* Biking */}
              <div>
                <h3 className="text-xl font-bold mb-6 uppercase tracking-wide">
                  15 {t('stationArea.minutes')} {t('stationArea.biking')}
                </h3>
                <div className="flex items-start gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-baseline py-2 border-b">
                      <span className="text-muted-foreground">{t('chart.housing')}</span>
                      <span className="text-xl font-bold text-[hsl(var(--housing))] tabular-nums">
                        {formatNumber(bikeStation.woon)} m²
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline py-2 border-b">
                      <span className="text-muted-foreground">{t('chart.work')}</span>
                      <span className="text-xl font-bold text-[hsl(var(--work))] tabular-nums">
                        {formatNumber(bikeStation.werk)} m²
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline py-2 border-b">
                      <span className="text-muted-foreground">{t('chart.facilities')}</span>
                      <span className="text-xl font-bold text-[hsl(var(--facilities))] tabular-nums">
                        {formatNumber(bikeStation.voorzieningen)} m²
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline py-3 border-t-2 mt-4">
                      <span className="font-bold">{t('chart.total')}</span>
                      <span className="text-2xl font-bold tabular-nums">
                        {formatNumber(bikeStation.total)} m²
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <MiniDonut station={bikeStation} size={200} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Themes - Coming Soon */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <Card key={theme.id} className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-xl uppercase tracking-wide">{theme.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">{t('themes.comingSoon')}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StationDetail;
