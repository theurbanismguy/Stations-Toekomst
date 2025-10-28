import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { StationData } from "@/lib/stationData";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { MobileTableCard } from "./MobileTableCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StationTableProps {
  data: StationData[];
}

type SortField = "name" | "total" | "woon" | "werk" | "voorzieningen";

export const StationTable = ({ data }: StationTableProps) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("total");
  const [sortAsc, setSortAsc] = useState(false);

  const filteredAndSorted = useMemo(() => {
    let result = data.filter((station) =>
      station.name.toLowerCase().includes(search.toLowerCase())
    );

    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortAsc
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });

    return result;
  }, [data, search, sortField, sortAsc]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const getSizeBadgeVariant = (size: string) => {
    switch (size) {
      case "kathedraal":
        return "default";
      case "mega":
        return "secondary";
      case "plus":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
        <Input
          placeholder={t('chart.searchStation')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 focus-visible:ring-primary"
        />
      </div>

      {isMobile ? (
        <div className="space-y-3">
          {filteredAndSorted.map((station) => (
            <MobileTableCard 
              key={station.name} 
              station={station} 
              getSizeBadgeVariant={getSizeBadgeVariant}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("name")}
                    className="font-semibold"
                  >
                    {t('table.station')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>{t('table.type')}</TableHead>
                <TableHead className="text-right bg-[hsl(var(--housing-light))]">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("woon")}
                    className="font-semibold hover:bg-[hsl(var(--housing))] hover:text-white"
                  >
                    {t('table.housing')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right bg-[hsl(var(--work-light))]">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("werk")}
                    className="font-semibold hover:bg-[hsl(var(--work))] hover:text-white"
                  >
                    {t('table.work')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right bg-[hsl(var(--facilities-light))]">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("voorzieningen")}
                    className="font-semibold hover:bg-[hsl(var(--facilities))] hover:text-white"
                  >
                    {t('table.facilities')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("total")}
                    className="font-semibold"
                  >
                    {t('table.total')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSorted.map((station) => (
                <TableRow key={station.name} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{station.name}</TableCell>
                  <TableCell>
                    <Badge variant={getSizeBadgeVariant(station.size)}>
                      {station.size}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums bg-[hsl(var(--housing-light))]/30">
                    {station.woon.toLocaleString("nl-NL")}
                  </TableCell>
                  <TableCell className="text-right tabular-nums bg-[hsl(var(--work-light))]/30">
                    {station.werk.toLocaleString("nl-NL")}
                  </TableCell>
                  <TableCell className="text-right tabular-nums bg-[hsl(var(--facilities-light))]/30">
                    {station.voorzieningen.toLocaleString("nl-NL")}
                  </TableCell>
                  <TableCell className="text-right font-semibold tabular-nums">
                    {station.total.toLocaleString("nl-NL")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
