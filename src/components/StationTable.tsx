import { useState, useMemo } from "react";
import { StationData } from "@/lib/stationData";
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
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Zoek station..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="rounded-lg border overflow-hidden">
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
                  Station
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("woon")}
                  className="font-semibold"
                >
                  Wonen
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("werk")}
                  className="font-semibold"
                >
                  Werken
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("voorzieningen")}
                  className="font-semibold"
                >
                  Voorzieningen
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
                  Totaal
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
                <TableCell className="text-right tabular-nums">
                  {station.woon.toLocaleString("nl-NL")}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {station.werk.toLocaleString("nl-NL")}
                </TableCell>
                <TableCell className="text-right tabular-nums">
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
    </div>
  );
};
