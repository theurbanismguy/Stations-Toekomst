import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { StationData, calculateDonutScale } from "@/lib/stationData";
import { MiniDonut } from "./MiniDonut";
import { Input } from "./ui/input";
import { Search, Table } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useDebounce } from "@/hooks/useDebounce";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { SortButton, SortOrder } from "./SortButton";
import { Button } from "./ui/button";

interface StationGridProps {
  data: StationData[];
  onShowTable: () => void;
}

export const StationGrid = ({ data, onShowTable }: StationGridProps) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const maxTotal = useMemo(() => {
    return Math.max(...data.map((s) => s.total));
  }, [data]);

  const filteredAndSortedStations = useMemo(() => {
    let filtered = data;
    
    // Apply search filter
    if (debouncedSearch) {
      filtered = data.filter((station) =>
        station.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortOrder !== "none") {
      filtered = [...filtered].sort((a, b) => {
        if (sortOrder === "asc") return a.total - b.total;
        return b.total - a.total; // desc
      });
    }
    
    return filtered;
  }, [data, debouncedSearch, sortOrder]);

  return (
    <Card>
      <CardHeader>
        {/* Search Bar + Controls Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('chart.searchStation')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Sort + All Data Buttons */}
          <div className="flex gap-2">
            <SortButton sortOrder={sortOrder} onSortChange={setSortOrder} />
            <Button
              variant="outline"
              size="sm"
              onClick={onShowTable}
              className="gap-2 whitespace-nowrap"
            >
              <Table className="h-4 w-4" />
              <span className="hidden sm:inline">{t('views.allData')}</span>
            </Button>
          </div>
        </div>
        
        {/* Station Count */}
        <div className="text-sm text-muted-foreground mt-2">
          {filteredAndSortedStations.length} {filteredAndSortedStations.length === 1 ? t('chart.stationFound') : t('chart.stationsFound')}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {filteredAndSortedStations.map((station) => {
            const scale = calculateDonutScale(
              station.total, 
              maxTotal, 
              isMobile ? 80 : 60, 
              isMobile ? 120 : 160
            );
            return (
              <MiniDonut key={station.name} station={station} size={scale} />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
