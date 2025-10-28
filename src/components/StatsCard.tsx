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
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
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
