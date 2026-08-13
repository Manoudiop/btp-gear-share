import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, FileText, Search, Tractor } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useLanguage } from "@/contexts/LanguageContext";
import { equipment } from "@/data/equipment";
import { materials } from "@/data/materials";
import { categoryLabel } from "@/data/categoryIcons";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MAX_PER_GROUP = 5;

/**
 * Palette de recherche du site.
 *
 * Cherche dans les deux catalogues et dans les pages, et retombe sur une
 * recherche plein texte dans le catalogue d'équipements quand aucun résultat
 * direct ne convient. S'ouvre au clic sur la loupe ou par Ctrl/⌘ + K.
 */
const SearchCommand = ({ open, onOpenChange }: SearchCommandProps) => {
  const navigate = useNavigate();
  const { t, formatPrice } = useLanguage();
  const [query, setQuery] = useState("");

  // Le champ repart vide à chaque ouverture.
  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  const pages = useMemo(
    () => [
      { path: "/equipment", label: t("nav.equipment") },
      { path: "/materials", label: t("nav.materials") },
      { path: "/pricing", label: t("nav.pricing") },
      { path: "/how-it-works", label: t("nav.howItWorks") },
      { path: "/about", label: t("nav.about") },
      { path: "/contact", label: t("nav.contact") },
      { path: "/become-owner", label: t("nav.becomeOwner") },
      { path: "/custom-quote", label: t("quote.title") },
      { path: "/cart", label: t("nav.cart") },
    ],
    [t],
  );

  const term = query.trim().toLowerCase();

  // `cmdk` filtre lui-même sur le texte des entrées ; on borne surtout la liste
  // pour ne pas afficher tout le catalogue à l'ouverture.
  const matchedEquipment = useMemo(() => {
    const source = term
      ? equipment.filter((item) =>
          [item.name, item.category, item.location, item.owner]
            .join(" ")
            .toLowerCase()
            .includes(term),
        )
      : equipment;
    return source.slice(0, MAX_PER_GROUP);
  }, [term]);

  const matchedMaterials = useMemo(() => {
    const source = term
      ? materials.filter((item) =>
          [item.name, item.category, item.supplier].join(" ").toLowerCase().includes(term),
        )
      : materials;
    return source.slice(0, MAX_PER_GROUP);
  }, [term]);

  const matchedPages = useMemo(
    () => (term ? pages.filter((page) => page.label.toLowerCase().includes(term)) : pages),
    [pages, term],
  );

  const go = (path: string) => {
    onOpenChange(false);
    navigate(path);
  };

  return (
    // Le filtre intégré de cmdk est désactivé : le tri est fait ci-dessus, sur
    // les champs métier (ville, fournisseur…) et pas seulement sur le libellé.
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      shouldFilter={false}
      label={t("cmd.placeholder")}
    >
      <CommandInput
        placeholder={t("cmd.placeholder")}
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>{t("cmd.empty")}</CommandEmpty>

        {term && (
          <>
            <CommandGroup>
              <CommandItem value={`__search-${term}`} onSelect={() => go(`/equipment?q=${encodeURIComponent(query.trim())}`)}>
                <Search className="mr-2 h-4 w-4" />
                {t("cmd.searchFor", { query: query.trim() })}
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {matchedEquipment.length > 0 && (
          <CommandGroup heading={t("cmd.equipment")}>
            {matchedEquipment.map((item) => (
              <CommandItem
                key={item.id}
                value={`equipment-${item.id}-${item.name}`}
                onSelect={() => go(`/equipment/${item.id}`)}
              >
                <Tractor className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{item.name}</span>
                <span className="ml-auto shrink-0 pl-3 text-xs text-muted-foreground">
                  {categoryLabel(t, item.category)} · {formatPrice(item.price)}
                  {t("common.perDay")}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {matchedMaterials.length > 0 && (
          <CommandGroup heading={t("cmd.materials")}>
            {matchedMaterials.map((item) => (
              <CommandItem
                key={item.id}
                value={`material-${item.id}-${item.name}`}
                onSelect={() => go(`/material/${item.id}`)}
              >
                <Box className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{item.name}</span>
                <span className="ml-auto shrink-0 pl-3 text-xs text-muted-foreground">
                  {formatPrice(item.price)}/{item.unit}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {matchedPages.length > 0 && (
          <CommandGroup heading={t("cmd.pages")}>
            {matchedPages.map((page) => (
              <CommandItem
                key={page.path}
                value={`page-${page.path}-${page.label}`}
                onSelect={() => go(page.path)}
              >
                <FileText className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                {page.label}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
