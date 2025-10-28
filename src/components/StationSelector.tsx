import { useState } from "react";
import { StationData } from "@/lib/stationData";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StationSelectorProps {
  data: StationData[];
  selectedStations: string[];
  onSelectionChange: (stations: string[]) => void;
}

export const StationSelector = ({
  data,
  selectedStations,
  onSelectionChange,
}: StationSelectorProps) => {
  const [open, setOpen] = useState(false);

  const toggleStation = (stationName: string) => {
    if (selectedStations.includes(stationName)) {
      onSelectionChange(selectedStations.filter((s) => s !== stationName));
    } else {
      onSelectionChange([...selectedStations, stationName]);
    }
  };

  const clearAll = () => {
    onSelectionChange([]);
  };

  const selectAll = () => {
    onSelectionChange(data.map((s) => s.name));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="flex-1 justify-between"
            >
              {selectedStations.length === 0
                ? "Selecteer stations..."
                : `${selectedStations.length} station${selectedStations.length > 1 ? "s" : ""} geselecteerd`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Zoek station..." />
              <CommandEmpty>Geen stations gevonden.</CommandEmpty>
              <ScrollArea className="h-[300px]">
                <CommandGroup>
                  {data.map((station) => (
                    <CommandItem
                      key={station.name}
                      value={station.name}
                      onSelect={() => toggleStation(station.name)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedStations.includes(station.name)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <span className="flex-1">{station.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {station.total.toLocaleString("nl-NL")} m²
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </Command>
          </PopoverContent>
        </Popover>
        <Button variant="outline" size="sm" onClick={clearAll}>
          Wissen
        </Button>
        <Button variant="outline" size="sm" onClick={selectAll}>
          Alles
        </Button>
      </div>

      {selectedStations.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedStations.map((stationName) => (
            <Badge key={stationName} variant="secondary" className="gap-1">
              {stationName}
              <X
                className="h-3 w-3 cursor-pointer hover:text-accent"
                onClick={() => toggleStation(stationName)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
