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
        className="bg-muted/50 p-1 rounded"
      >
        <ToggleGroupItem
          value="overview"
          aria-label="Overview"
          className="data-[state=on]:bg-foreground data-[state=on]:text-background"
        >
          <PieChart className="h-4 w-4 mr-2" />
          {t('views.overview')}
        </ToggleGroupItem>
        <ToggleGroupItem
          value="top10"
          aria-label="Top & Bottom 10"
          className="data-[state=on]:bg-foreground data-[state=on]:text-background"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          {t('views.topBottom')}
        </ToggleGroupItem>
        <ToggleGroupItem
          value="compare"
          aria-label="Compare"
          className="data-[state=on]:bg-foreground data-[state=on]:text-background"
        >
          <GitCompare className="h-4 w-4 mr-2" />
          {t('views.compare')}
        </ToggleGroupItem>
        <ToggleGroupItem
          value="table"
          aria-label="All Data"
          className="data-[state=on]:bg-foreground data-[state=on]:text-background"
        >
          <Table className="h-4 w-4 mr-2" />
          {t('views.allData')}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
