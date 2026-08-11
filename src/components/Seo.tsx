import { useEffect } from "react";

interface SeoProps {
  /** Titre de la page, sans le suffixe du site. */
  title: string;
  description?: string;
  /** Demande aux moteurs de ne pas indexer la page (404, tunnel de commande…). */
  noIndex?: boolean;
}

const SITE_NAME = "BTP Location";

const setMeta = (name: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
};

/**
 * Renseigne le titre et la description de la page.
 *
 * Remplace react-helmet : la version installée n'appliquait rien sous React 18,
 * si bien que toutes les pages partageaient le titre par défaut du index.html.
 * Un effet suffit ici — l'application est rendue côté client uniquement.
 */
const Seo = ({ title, description, noIndex }: SeoProps) => {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`;
  }, [title]);

  useEffect(() => {
    if (description) setMeta("description", description);
  }, [description]);

  useEffect(() => {
    setMeta("robots", noIndex ? "noindex" : "index, follow");
  }, [noIndex]);

  return null;
};

export default Seo;
