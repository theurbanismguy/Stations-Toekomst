import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
}

export const StatsCard = ({ title, value, subtitle, icon: Icon, trend }: StatsCardProps) => {
  const getIconColor = () => {
    if (title.includes("Wonen")) return "text-[hsl(var(--housing))]";
    if (title.includes("Werken")) return "text-[hsl(var(--work))]";
    if (title.includes("Voorzieningen")) return "text-[hsl(var(--facilities))]";
    return "text-primary";
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-5 w-5 ${getIconColor()}`} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">
          {typeof value === "number" ? value.toLocaleString("nl-NL") : value}
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && (
          <p className="text-xs text-accent mt-2 font-medium">{trend}</p>
        )}
      </CardContent>
    </Card>
  );
};
