import { useLanguage, Language } from "@/contexts/LanguageContext";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-muted/30 rounded p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-sm font-medium transition-colors rounded ${
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
        className={`px-3 py-1 text-sm font-medium transition-colors rounded ${
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
