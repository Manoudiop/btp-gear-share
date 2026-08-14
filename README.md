# BTP Gear Share

Plateforme de **location de matériel de chantier** et de **vente de matériaux de construction**,
mettant en relation loueurs et professionnels du BTP.

Interface bilingue français / anglais, avec conversion de devise (EUR, XOF, USD).

## Démarrage

```bash
npm install
```

```bash
npm run dev
```

L'application démarre sur http://localhost:8080.

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement (port 8080) |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Sert le build de production localement |
| `npm run lint` | ESLint sur tout le projet |

## Comptes de démonstration

L'authentification est **simulée côté client** : il n'y a pas encore de backend.
Les identifiants ci-dessous sont vérifiés dans le navigateur et ne protègent rien —
ils servent uniquement à explorer les trois espaces.

| Email | Mot de passe | Espace |
| --- | --- | --- |
| `client@btp.demo` | `Buildora123` | Client — commandes, historique |
| `loueur@btp.demo` | `Buildora123` | Loueur — parc, locations, revenus, stats |
| `admin@btp.demo` | `Buildora123` | Administration — utilisateurs, annonces, matériaux |

Le formulaire de connexion propose ces comptes en un clic.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (Radix)
- **React Router v6** — routes publiques sous un layout commun, espaces compte protégés par rôle
- **React Hook Form** + **Zod** — formulaires et validation
- **Recharts** — graphiques du tableau de bord loueur
- **TanStack Query** — installé, prêt pour le branchement d'une API

## Organisation

```
src/
├── data/          Source unique des données (catalogue, annonces, utilisateurs, commandes)
├── i18n/          Dictionnaire FR/EN
├── contexts/      Auth, panier, langue & devise
├── components/
│   ├── layout/    Chrome public (navbar + footer + remontée de scroll)
│   ├── account/   Chrome des espaces compte
│   ├── auth/      Formulaire d'authentification, garde de route
│   ├── quote/     Assistant de devis sur mesure
│   └── ui/        Primitives shadcn/ui
└── pages/         Une page par route
```

### Visuels de marque

`public/` contient le favicon, l'icône iOS et l'image de partage social.
Ils sont générés par un script plutôt que retouchés à la main :

```bash
pip install pillow && python scripts/make-brand-assets.py
```

Pillow n'est pas une dépendance du projet : il ne sert qu'à régénérer ces
fichiers après un changement de charte (couleur, logo, accroche).

### Données

Tant qu'il n'y a pas d'API, `src/data/` tient lieu de base de données :

| Fichier | Contenu |
| --- | --- |
| `equipment.ts` | Catalogue de location + recherche par id et similaires |
| `materials.ts` | Catalogue de vente + produits associés |
| `listings.ts` | Parc vu du back-office (modération admin, disponibilité loueur) |
| `users.ts` | Annuaire des utilisateurs et comptes de démonstration |
| `orders.ts` | Commandes de démonstration + commandes passées, persistées en `localStorage` |
| `store.ts` | Petit magasin d'état partagé et persistant, qui alimente le back-office |
| `types.ts` | Types partagés |

Le jour où un backend arrive, ce sont les fonctions d'accès de ces fichiers
(`getEquipmentById`, `getOrders`, `placeOrder`…) qui deviennent des appels réseau —
les pages n'ont pas à changer.

### Internationalisation

`src/i18n/translations.ts` porte le dictionnaire ; `useLanguage()` expose :

- `t(clé, variables?)` — traduction, avec interpolation `{nom}`
- `formatPrice(montantEur)` — conversion et formatage selon la devise active
- `language`, `currency`, `locale`

Les montants sont stockés **en euros** dans les données et convertis à l'affichage.
Langue et devise sont mémorisées dans `localStorage`, la langue initiale étant
déduite du navigateur.

L'ensemble du site est traduit : pages publiques, tunnel de commande, assistant
de devis, pages légales et espaces compte. Seules les **données** restent telles
quelles — noms d'équipements, de matériaux et de fournisseurs — comme le ferait
un vrai catalogue.

### Persistance navigateur

| Clé `localStorage` | Contenu |
| --- | --- |
| `authUser` | Session (validée à la lecture) |
| `btp-listings`, `btp-users` | Modifications faites depuis le back-office |
| `btp-cart` | Panier |
| `btp-orders` | Commandes passées depuis le tunnel |
| `btp-language`, `btp-currency` | Préférences d'affichage |

## Backend (en préparation)

Le projet est prêt à être branché sur **Supabase**. Rien n'est encore connecté :
sans variables d'environnement, l'application tourne sur les données de
démonstration de `src/data/` et fonctionne telle quelle.

```
supabase/
├── migrations/0001_schema.sql    Tables, index, recherche plein texte
├── migrations/0002_policies.sql  Sécurité par ligne
└── seed.sql                      Jeu de données initial (généré)
```

Le jeu de données initial est produit depuis le catalogue front, pour qu'il n'en
diverge pas :

```bash
node scripts/generate-seed.mjs
```

### Mise en route

1. Créer un projet sur [supabase.com](https://supabase.com).
2. Exécuter `0001_schema.sql` puis `0002_policies.sql` dans l'éditeur SQL.
3. Créer les trois comptes de démonstration dans **Authentication → Users**
   (les emails attendus sont rappelés en tête de `seed.sql`).
4. Exécuter `seed.sql`.
5. Copier `.env.example` en `.env.local` et y coller l'URL du projet et la clé
   `anon` (**Project Settings → API**).

### Ce que la base change

`equipment` et `listings` étaient deux jeux de données distincts décrivant le
même objet — un héritage des données de démonstration. Ils sont fusionnés dans
une seule table `equipment`, avec les colonnes de modération à côté de celles
du catalogue.

La table `bookings` n'avait pas d'équivalent côté front : réserver un
équipement affichait une confirmation sans rien enregistrer.

Surtout, l'autorisation change de camp. `PrivateRoute` ne fait que masquer des
écrans : il suffit d'éditer le `localStorage` pour se déclarer administrateur.
Les règles de `0002_policies.sql` sont appliquées par la base et ne peuvent pas
être contournées depuis le navigateur.

## Limites connues

- **Aucun backend.** Authentification, paiement, envoi de formulaires et suivi de
  commande sont simulés dans le navigateur. Rien n'est réellement protégé ni transmis.
- Le paiement du tunnel de commande ne demande aucune coordonnée bancaire et
  n'effectue aucune transaction.
- La vue carte du catalogue d'équipements n'est pas implémentée.
