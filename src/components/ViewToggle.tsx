import { useLanguage } from "@/contexts/LanguageContext";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PieChart, BarChart3, GitCompare, Table } from "lucide-react";

export type ViewType = "overview" | "top10" | "compare" | "table";

interface ViewToggleProps {
  value: ViewType;
  onValueChange: (value: ViewType) => void;
}

export const ViewToggle = ({ value, onValueChange }: ViewToggleProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex justify-center">
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(newValue) => {
          if (newValue) onValueChange(newValue as ViewType);
        }}
        className="bg-muted/50 p-0.5 rounded text-xs"
      >
        <ToggleGroupItem
          value="overview"
          aria-label="Overview"
          className="data-[state=on]:bg-foreground data-[state=on]:text-background px-2 md:px-3"
        >
          <PieChart className="h-3 w-3 md:h-4 md:w-4" />
          <span className="ml-2 hidden md:inline">{t('views.overview')}</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="top10"
          aria-label="Top & Bottom 10"
          className="data-[state=on]:bg-foreground data-[state=on]:text-background px-2 md:px-3"
        >
          <BarChart3 className="h-3 w-3 md:h-4 md:w-4" />
          <span className="ml-2 hidden md:inline">{t('views.topBottom')}</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="compare"
          aria-label="Compare"
          className="data-[state=on]:bg-foreground data-[state=on]:text-background px-2 md:px-3"
        >
          <GitCompare className="h-3 w-3 md:h-4 md:w-4" />
          <span className="ml-2 hidden md:inline">{t('views.compare')}</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="table"
          aria-label="All Data"
          className="data-[state=on]:bg-foreground data-[state=on]:text-background px-2 md:px-3"
        >
          <Table className="h-3 w-3 md:h-4 md:w-4" />
          <span className="ml-2 hidden md:inline">{t('views.allData')}</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
