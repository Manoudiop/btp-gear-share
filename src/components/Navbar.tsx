import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import LanguageCurrencySwitcher from "./LanguageCurrencySwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  ALL_CATEGORIES,
  categoryLabel,
  equipmentCategoryOptions,
  materialCategoryOptions,
} from "@/data/categoryIcons";

/**
 * Barre de navigation principale.
 *
 * Sept liens de premier niveau ne tenaient pas : les libellés longs passaient à
 * la ligne et les actions de droite sortaient de l'écran entre 768 et 1100 px.
 * Les deux catalogues deviennent des menus déroulants, les pages secondaires
 * sont regroupées, et le menu compact prend le relais jusqu'à `lg`.
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Le menu compact doit se refermer quand la navigation aboutit.
  useEffect(() => setMobileOpen(false), [location.pathname, location.search]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // La barre ne se fond dans la page qu'au-dessus du hero de l'accueil.
  const isTransparent = location.pathname === "/" && !isScrolled;

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const secondaryLinks = [
    { label: t("nav.howItWorks"), path: "/how-it-works" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.contact"), path: "/contact" },
  ];

  const catalogues = [
    {
      path: "/equipment",
      label: t("nav.equipment"),
      allLabel: t("nav.allEquipment"),
      options: equipmentCategoryOptions,
    },
    {
      path: "/materials",
      label: t("nav.materials"),
      allLabel: t("nav.allMaterials"),
      options: materialCategoryOptions,
    },
  ];

  const linkClass = (active: boolean) =>
    cn(
      "relative whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
      "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary after:transition-transform",
      active
        ? "text-foreground after:scale-x-100"
        : "text-foreground/70 hover:text-foreground after:scale-x-0",
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        isTransparent
          ? "bg-transparent"
          : "border-b bg-background/85 shadow-subtle backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6 lg:px-8">
        <Logo className="mr-2 shrink-0" />

        {/* Navigation principale */}
        <nav className="hidden items-center gap-1 lg:flex">
          {catalogues.map((catalogue) => (
            <DropdownMenu key={catalogue.path}>
              <DropdownMenuTrigger
                className={cn(linkClass(isActive(catalogue.path)), "flex items-center gap-1")}
              >
                {catalogue.label}
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to={catalogue.path} className="cursor-pointer font-medium">
                    {catalogue.allLabel}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {catalogue.options
                  .filter((option) => option.label !== ALL_CATEGORIES)
                  .map((option) => (
                    <DropdownMenuItem key={option.label} asChild>
                      <Link
                        to={`${catalogue.path}?category=${encodeURIComponent(option.label)}`}
                        className="cursor-pointer"
                      >
                        {categoryLabel(t, option.label)}
                      </Link>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}

          <Link to="/pricing" className={linkClass(isActive("/pricing"))}>
            {t("nav.pricing")}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                linkClass(secondaryLinks.some((link) => isActive(link.path))),
                "flex items-center gap-1",
              )}
            >
              {t("nav.more")}
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {secondaryLinks.map((link) => (
                <DropdownMenuItem key={link.path} asChild>
                  <Link to={link.path} className="cursor-pointer">
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:block">
            <LanguageCurrencySwitcher />
          </div>

          <Button variant="ghost" size="icon" aria-label={t("nav.search")} asChild>
            <Link to="/equipment">
              <Search className="h-[18px] w-[18px]" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="relative" aria-label={t("nav.cart")} asChild>
            <Link to="/cart">
              <ShoppingCart className="h-[18px] w-[18px]" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 px-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <User className="h-4 w-4" />
                  </span>
                  <span className="hidden max-w-28 truncate xl:inline">{user?.name}</span>
                  <ChevronDown className="hidden h-3.5 w-3.5 opacity-60 xl:inline" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <p className="truncate text-sm font-medium">{user?.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    {t("nav.dashboard")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    {t("nav.settings")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("nav.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" className="hidden rounded-full sm:inline-flex" asChild>
              <Link to="/login">{t("nav.login")}</Link>
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            className="hidden rounded-full xl:inline-flex"
            asChild
          >
            <Link to="/become-owner">{t("nav.becomeOwner")}</Link>
          </Button>

          {/* Menu compact */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t("nav.openMenu")}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm overflow-y-auto">
              <SheetHeader className="text-left">
                <SheetTitle>{t("nav.menu")}</SheetTitle>
              </SheetHeader>

              <nav className="mt-6 flex flex-col gap-1">
                <Link
                  to="/"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  {t("nav.home")}
                </Link>

                {catalogues.map((catalogue) => (
                  <div key={catalogue.path} className="mt-2">
                    <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {catalogue.label}
                    </p>
                    <Link
                      to={catalogue.path}
                      className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                      {catalogue.allLabel}
                    </Link>
                    <div className="grid grid-cols-2 gap-1">
                      {catalogue.options
                        .filter((option) => option.label !== ALL_CATEGORIES)
                        .map((option) => (
                          <Link
                            key={option.label}
                            to={`${catalogue.path}?category=${encodeURIComponent(option.label)}`}
                            className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            {categoryLabel(t, option.label)}
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}

                <Separator className="my-3" />

                <Link
                  to="/pricing"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  {t("nav.pricing")}
                </Link>
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}

                <Separator className="my-3" />

                <div className="flex items-center justify-between px-3 py-1">
                  <span className="text-sm text-muted-foreground">{t("general.language")}</span>
                  <LanguageCurrencySwitcher />
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  {!isAuthenticated && (
                    <Button className="w-full rounded-full" asChild>
                      <Link to="/login">{t("nav.login")}</Link>
                    </Button>
                  )}
                  <Button variant="outline" className="w-full rounded-full" asChild>
                    <Link to="/become-owner">{t("nav.becomeOwner")}</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
