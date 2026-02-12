import { Globe, DollarSign } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage, type Language, type Currency } from "@/contexts/LanguageContext";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

const CURRENCIES: { code: Currency; label: string; symbol: string }[] = [
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "XOF", label: "Franc CFA", symbol: "FCFA" },
  { code: "USD", label: "US Dollar", symbol: "$" },
];

const LanguageCurrencySwitcher = () => {
  const { language, setLanguage, currency, setCurrency, t } = useLanguage();

  const currentLang = LANGUAGES.find((l) => l.code === language)!;
  const currentCurrency = CURRENCIES.find((c) => c.code === currency)!;

  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs gap-1">
            <Globe className="h-3.5 w-3.5" />
            <span>{currentLang.flag}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[140px]">
          <DropdownMenuLabel className="text-xs">{t("general.language")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {LANGUAGES.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`cursor-pointer ${language === lang.code ? "bg-accent" : ""}`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs gap-1">
            <DollarSign className="h-3.5 w-3.5" />
            <span>{currentCurrency.symbol}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[160px]">
          <DropdownMenuLabel className="text-xs">{t("general.currency")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {CURRENCIES.map((curr) => (
            <DropdownMenuItem
              key={curr.code}
              onClick={() => setCurrency(curr.code)}
              className={`cursor-pointer ${currency === curr.code ? "bg-accent" : ""}`}
            >
              <span className="mr-2 font-mono text-xs w-8">{curr.symbol}</span>
              {curr.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageCurrencySwitcher;
