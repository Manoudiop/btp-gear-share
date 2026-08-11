import { Link, useLocation } from "react-router-dom";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Seo from "@/components/Seo";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Seo title={t("notFound.title")} noIndex />

      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Compass className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-primary mb-2">404</p>
        <h1 className="text-3xl font-bold mb-3">{t("notFound.title")}</h1>
        <p className="text-muted-foreground mb-2">{t("notFound.desc")}</p>
        <p className="mb-8 font-mono text-sm text-muted-foreground">{location.pathname}</p>
        <Button asChild>
          <Link to="/">{t("notFound.home")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
