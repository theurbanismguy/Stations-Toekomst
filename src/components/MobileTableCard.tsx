import { StationData } from "@/lib/stationData";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

interface MobileTableCardProps {
  station: StationData;
  getSizeBadgeVariant: (size: string) => "default" | "secondary" | "outline";
}

export const MobileTableCard = ({ station, getSizeBadgeVariant }: MobileTableCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="p-4 border rounded-lg space-y-3 cursor-pointer hover:bg-accent/50 transition-colors active:scale-[0.98]"
      onClick={() => navigate(`/station/${encodeURIComponent(station.name)}`)}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-base leading-tight">{station.name}</h3>
        <Badge variant={getSizeBadgeVariant(station.size)}>
          {station.size}
        </Badge>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <div className="text-muted-foreground text-xs">Wonen</div>
          <div className="font-medium">{station.woon.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-muted-foreground text-xs">Werken</div>
          <div className="font-medium">{station.werk.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-muted-foreground text-xs">Voorz.</div>
          <div className="font-medium">{station.voorzieningen.toLocaleString()}</div>
        </div>
      </div>
      
      <div className="pt-2 border-t">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Totaal BVO</span>
          <span className="font-semibold text-base">{station.total.toLocaleString()} m²</span>
        </div>
      </div>
    </div>
  );
};
