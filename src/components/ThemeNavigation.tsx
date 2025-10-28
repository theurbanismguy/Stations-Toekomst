import { useLanguage } from "@/contexts/LanguageContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const themes = [
  { key: 'network', active: false },
  { key: 'access', active: false },
  { key: 'program', active: true },
  { key: 'economy', active: false },
  { key: 'equity', active: false },
  { key: 'resilience', active: false },
] as const;

export const ThemeNavigation = () => {
  const { t } = useLanguage();

  return (
    <TooltipProvider>
      <nav className="border-b bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 py-3">
            {themes.map((theme) => (
              <div key={theme.key}>
                {theme.active ? (
                  <button
                    className="text-sm font-bold uppercase tracking-wide text-foreground border-b-2 border-accent pb-1"
                    aria-current="page"
                  >
                    {t(`themes.${theme.key}`)}
                  </button>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="text-sm font-medium uppercase tracking-wide text-muted-foreground cursor-not-allowed"
                        disabled
                        aria-disabled="true"
                      >
                        {t(`themes.${theme.key}`)}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t('themes.comingSoon')}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
};
