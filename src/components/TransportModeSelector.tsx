import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TransportMode = 'walk' | 'bike';

interface TransportModeSelectorProps {
  value: TransportMode;
  onChange: (mode: TransportMode) => void;
}

export const TransportModeSelector = ({ value, onChange }: TransportModeSelectorProps) => {
  const { t } = useLanguage();

  return (
    <div className="border-b bg-card/20 py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 text-lg">
          <span className="font-bold">{t('stationArea.question')}</span>
          <span className="text-muted-foreground">{t('stationArea.duration')}</span>
          <Select value={value} onValueChange={(v) => onChange(v as TransportMode)}>
            <SelectTrigger className="w-32 font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="walk">{t('stationArea.walk')}</SelectItem>
              <SelectItem value="bike">{t('stationArea.bike')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
