import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export type SortOrder = "none" | "asc" | "desc";

interface SortButtonProps {
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

export const SortButton = ({ sortOrder, onSortChange }: SortButtonProps) => {
  const { t } = useLanguage();
  
  const handleClick = () => {
    if (sortOrder === "none") onSortChange("desc");
    else if (sortOrder === "desc") onSortChange("asc");
    else onSortChange("none");
  };

  const getIcon = () => {
    if (sortOrder === "asc") return <ArrowUp className="h-4 w-4" />;
    if (sortOrder === "desc") return <ArrowDown className="h-4 w-4" />;
    return <ArrowUpDown className="h-4 w-4" />;
  };

  const getLabel = () => {
    if (sortOrder === "asc") return t('sort.ascending');
    if (sortOrder === "desc") return t('sort.descending');
    return t('sort.default');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      className="gap-2 whitespace-nowrap"
    >
      {getIcon()}
      <span className="hidden sm:inline">{getLabel()}</span>
    </Button>
  );
};
