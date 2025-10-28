import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { StationData } from "@/lib/stationData";
import { useNavigate } from "react-router-dom";

interface MiniDonutProps {
  station: StationData;
  size?: number;
  clickable?: boolean;
}

export const MiniDonut = ({ station, size = 100, clickable = true }: MiniDonutProps) => {
  const navigate = useNavigate();
  const data = [
    { name: "Wonen", value: station.woon, color: "hsl(var(--housing))" },
    { name: "Werken", value: station.werk, color: "hsl(var(--work))" },
    { name: "Voorzieningen", value: station.voorzieningen, color: "hsl(var(--facilities))" },
  ];

  const handleClick = () => {
    if (clickable) {
      navigate(`/station/${encodeURIComponent(station.name)}`);
    }
  };

  return (
    <div 
      className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all group ${
        clickable ? 'hover:bg-muted/50 hover:scale-105 cursor-pointer' : ''
      }`}
      onClick={handleClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (clickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={clickable ? `View details for ${station.name}` : undefined}
    >
      <div style={{ width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center">
        <div className="text-xs font-medium text-foreground line-clamp-2">
          {station.name}
        </div>
        <div className="text-xs text-muted-foreground">
          {station.total.toLocaleString("nl-NL")} m²
        </div>
      </div>
    </div>
  );
};
