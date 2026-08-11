
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchBarProps {
  placeholder?: string;
  /** Page de résultats vers laquelle envoyer la recherche. */
  target?: string;
}

const SearchBar = ({ placeholder, target = "/equipment" }: SearchBarProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("q") ?? "");

  // Garde le champ aligné sur l'URL (retour arrière, lien partagé, etc.).
  useEffect(() => {
    setTerm(searchParams.get("q") ?? "");
  }, [searchParams]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Sur la page de résultats, on conserve les filtres déjà posés (catégorie…).
    const params = location.pathname === target ? new URLSearchParams(searchParams) : new URLSearchParams();
    const trimmed = term.trim();

    if (trimmed) {
      params.set("q", trimmed);
    } else {
      params.delete("q");
    }

    const queryString = params.toString();
    navigate(queryString ? `${target}?${queryString}` : target);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex w-full max-w-3xl mx-auto">
      <div className="relative flex-grow">
        <Input
          type="text"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder={placeholder ?? t("nav.search")}
          aria-label={placeholder ?? t("nav.search")}
          className="pl-10 py-6 pr-4 w-full rounded-l-md border-r-0"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>
      <Button className="rounded-l-none px-6" type="submit">
        {t("nav.search")}
      </Button>
    </form>
  );
};

export default SearchBar;
