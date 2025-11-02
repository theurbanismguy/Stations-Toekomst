import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/useMediaQuery";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className={`flex items-center gap-1 bg-muted/30 rounded p-1 ${isMobile ? 'text-xs' : ''}`}>
      <button
        onClick={() => setLanguage('en')}
        className={`${isMobile ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'} font-medium transition-colors rounded ${
          language === 'en'
            ? 'bg-foreground text-background'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('nl')}
        className={`${isMobile ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'} font-medium transition-colors rounded ${
          language === 'nl'
            ? 'bg-foreground text-background'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Schakel over naar Nederlands"
      >
        NL
      </button>
    </div>
  );
};
