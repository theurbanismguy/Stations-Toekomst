import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PieChart, BarChart3, GitCompare, Table } from "lucide-react";

export type ViewType = "overview" | "top10" | "compare" | "table";

interface ViewToggleProps {
  value: ViewType;
  onValueChange: (value: ViewType) => void;
}

export const ViewToggle = ({ value, onValueChange }: ViewToggleProps) => {
  return (
    <div className="flex justify-center">
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(newValue) => {
          if (newValue) onValueChange(newValue as ViewType);
        }}
        className="bg-muted p-1 rounded-lg"
      >
        <ToggleGroupItem
          value="overview"
          aria-label="Overview"
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          <PieChart className="h-4 w-4 mr-2" />
          Overzicht
        </ToggleGroupItem>
        <ToggleGroupItem
          value="top10"
          aria-label="Top & Bottom 10"
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Top & Bottom 10
        </ToggleGroupItem>
        <ToggleGroupItem
          value="compare"
          aria-label="Compare"
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          <GitCompare className="h-4 w-4 mr-2" />
          Vergelijken
        </ToggleGroupItem>
        <ToggleGroupItem
          value="table"
          aria-label="All Data"
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          <Table className="h-4 w-4 mr-2" />
          Alle Data
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
