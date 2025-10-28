import { useParams, useNavigate, Link } from "react-router-dom";
import { parseStationData, calculateDonutScale } from "@/lib/stationData";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatNumber } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Train } from "lucide-react";
import { MiniDonut } from "@/components/MiniDonut";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useIsMobile } from "@/hooks/useMediaQuery";

const StationDetail = () => {
  const { stationName } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const decodedName = stationName ? decodeURIComponent(stationName) : "";

  const walkData = parseStationData("walk");
  const bikeData = parseStationData("bike");

  const walkStation = walkData.find((s) => s.name === decodedName);
  const bikeStation = bikeData.find((s) => s.name === decodedName);

  // Calculate max total for scaling donuts
  const maxTotal = walkStation && bikeStation 
    ? Math.max(walkStation.total, bikeStation.total) 
    : 0;
  
  const walkDonutSize = walkStation 
    ? calculateDonutScale(walkStation.total, maxTotal, isMobile ? 140 : 120, isMobile ? 180 : 240) 
    : 160;
  const bikeDonutSize = bikeStation 
    ? calculateDonutScale(bikeStation.total, maxTotal, isMobile ? 140 : 120, isMobile ? 180 : 240) 
    : 160;

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
      <div className="border-b bg-white">
        <div className="container mx-auto px-3 md:px-4 lg:px-8 py-3 md:py-6 lg:py-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-3 md:mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('station.backToDashboard')}
          </Link>
          <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold uppercase tracking-tight mb-2">
            {walkStation.name}
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
            {walkStation.size} · {walkStation.type}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 md:px-4 lg:px-8 py-4 md:py-8 lg:py-12">
        <div className="space-y-6 md:space-y-8 lg:space-y-12">
          {/* Active Theme - Programma */}
          <div className="border rounded-none p-4 md:p-6 lg:p-8">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2">
              {t('themes.program')}
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide mb-6 md:mb-8">
              {t('station.stationAreaBVO')}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Walking */}
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide border-b pb-2">
                  15 {t('stationArea.minutes')} {t('stationArea.walking')}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[hsl(var(--housing))] font-semibold text-sm md:text-base">
                      {t('stats.housing')}
                    </span>
                    <span className="tabular-nums font-bold text-sm md:text-base">{formatNumber(walkStation.woon)} m²</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[hsl(var(--work))] font-semibold text-sm md:text-base">
                      {t('stats.work')}
                    </span>
                    <span className="tabular-nums font-bold text-sm md:text-base">{formatNumber(walkStation.werk)} m²</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[hsl(var(--facilities))] font-semibold text-sm md:text-base">
                      {t('stats.facilities')}
                    </span>
                    <span className="tabular-nums font-bold text-sm md:text-base">{formatNumber(walkStation.voorzieningen)} m²</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t font-bold text-base md:text-lg">
                    <span>{t('stats.total')}</span>
                    <span className="tabular-nums">{formatNumber(walkStation.total)} m²</span>
                  </div>
                </div>
                <div className="flex justify-center pt-4">
                  <MiniDonut station={walkStation} size={walkDonutSize} clickable={false} />
                </div>
              </div>

              {/* Biking */}
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide border-b pb-2">
                  15 {t('stationArea.minutes')} {t('stationArea.biking')}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[hsl(var(--housing))] font-semibold text-sm md:text-base">
                      {t('stats.housing')}
                    </span>
                    <span className="tabular-nums font-bold text-sm md:text-base">{formatNumber(bikeStation.woon)} m²</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[hsl(var(--work))] font-semibold text-sm md:text-base">
                      {t('stats.work')}
                    </span>
                    <span className="tabular-nums font-bold text-sm md:text-base">{formatNumber(bikeStation.werk)} m²</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[hsl(var(--facilities))] font-semibold text-sm md:text-base">
                      {t('stats.facilities')}
                    </span>
                    <span className="tabular-nums font-bold text-sm md:text-base">{formatNumber(bikeStation.voorzieningen)} m²</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t font-bold text-base md:text-lg">
                    <span>{t('stats.total')}</span>
                    <span className="tabular-nums">{formatNumber(bikeStation.total)} m²</span>
                  </div>
                </div>
                <div className="flex justify-center pt-4">
                  <MiniDonut station={bikeStation} size={bikeDonutSize} clickable={false} />
                </div>
              </div>
            </div>
          </div>

          {/* Coming Soon Themes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {themes.map((theme) => (
              <div key={theme.id} className="border rounded-none p-4 md:p-6 bg-muted/10">
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide mb-2">
                  {theme.name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                  {t('themes.comingSoon')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationDetail;
