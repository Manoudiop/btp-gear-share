-- Schéma initial de BTP Location.
--
-- Note de conception : le code front portait deux jeux de données distincts,
-- `equipment` (catalogue public) et `listings` (vue back-office), qui décrivent
-- en réalité le même objet. Ils sont fusionnés ici dans `equipment`, avec les
-- colonnes de modération (`status`, `featured`) et d'exploitation
-- (`availability`) à côté des colonnes de catalogue.

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------- Énumérations
create type user_role as enum ('client', 'owner', 'admin');
create type user_status as enum ('active', 'inactive', 'suspended');
create type listing_status as enum ('pending', 'approved', 'rejected');
create type listing_availability as enum ('available', 'rented', 'maintenance');
create type order_status as enum ('pending', 'processing', 'shipping', 'delivered', 'cancelled');
create type booking_status as enum ('pending', 'confirmed', 'active', 'completed', 'cancelled');

-- ------------------------------------------------------------------- Profils
-- Prolonge auth.users : Supabase gère l'identité, cette table porte le métier.
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  name text not null,
  email text not null,
  role user_role not null default 'client',
  status user_status not null default 'active',
  phone text,
  company text,
  address text,
  city text,
  postal_code text,
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

create index profiles_role_idx on profiles (role);

-- --------------------------------------------------------------- Équipements
create table equipment (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references profiles on delete cascade,
  name text not null,
  description text not null default '',
  category text not null,
  price_per_day numeric(10, 2) not null check (price_per_day >= 0),
  deposit numeric(10, 2) not null default 0 check (deposit >= 0),
  location text not null,
  image_url text,
  features text[] not null default '{}',
  insurance text[] not null default '{}',
  specifications jsonb not null default '{}',
  -- Modération, côté administration.
  status listing_status not null default 'pending',
  featured boolean not null default false,
  -- Exploitation, côté loueur.
  availability listing_availability not null default 'available',
  response_time text,
  created_at timestamptz not null default now()
);

create index equipment_owner_idx on equipment (owner_id);
create index equipment_category_idx on equipment (category);
create index equipment_status_idx on equipment (status);

-- Recherche plein texte : la palette cherche aussi par ville et par catégorie.
create index equipment_search_idx on equipment
  using gin (to_tsvector('french', name || ' ' || category || ' ' || location));

-- Jours où l'équipement peut être réservé.
create table equipment_availability (
  equipment_id uuid not null references equipment on delete cascade,
  day date not null,
  primary key (equipment_id, day)
);

-- ----------------------------------------------------------------- Matériaux
create table materials (
  id uuid primary key default uuid_generate_v4(),
  supplier_id uuid references profiles on delete set null,
  supplier_name text not null,
  name text not null,
  description text not null default '',
  category text not null,
  price numeric(10, 2) not null check (price >= 0),
  unit text not null,
  min_order numeric(10, 2) not null default 1,
  max_order numeric(10, 2) not null default 100,
  stock numeric(12, 2) not null default 0,
  location text,
  image_url text,
  features text[] not null default '{}',
  specifications jsonb not null default '{}',
  is_available boolean not null default true,
  created_at timestamptz not null default now()
);

create index materials_category_idx on materials (category);

create table delivery_options (
  id uuid primary key default uuid_generate_v4(),
  material_id uuid not null references materials on delete cascade,
  type text not null,
  delay text not null,
  -- Null quand l'option est « sur devis ».
  price numeric(10, 2)
);

-- -------------------------------------------------------- Avis et questions
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid not null references profiles on delete cascade,
  equipment_id uuid references equipment on delete cascade,
  material_id uuid references materials on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  comment text not null default '',
  created_at timestamptz not null default now(),
  -- Un avis porte sur un équipement ou un matériau, jamais les deux.
  constraint reviews_single_target check (
    (equipment_id is not null and material_id is null)
    or (equipment_id is null and material_id is not null)
  )
);

create index reviews_equipment_idx on reviews (equipment_id);
create index reviews_material_idx on reviews (material_id);

create table questions (
  id uuid primary key default uuid_generate_v4(),
  equipment_id uuid not null references equipment on delete cascade,
  author_id uuid not null references profiles on delete cascade,
  question text not null,
  answer text,
  created_at timestamptz not null default now(),
  answered_at timestamptz
);

create index questions_equipment_idx on questions (equipment_id);

-- ------------------------------------------------------------------ Commandes
create table orders (
  id uuid primary key default uuid_generate_v4(),
  reference text not null unique,
  user_id uuid not null references profiles on delete cascade,
  status order_status not null default 'processing',
  subtotal numeric(10, 2) not null,
  delivery_fee numeric(10, 2) not null default 0,
  total numeric(10, 2) not null,
  shipping_address jsonb not null,
  payment_method text not null,
  delivery_option text not null,
  notes text,
  tracking_number text,
  estimated_delivery date,
  created_at timestamptz not null default now()
);

create index orders_user_idx on orders (user_id, created_at desc);

create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders on delete cascade,
  material_id uuid references materials on delete set null,
  -- Nom et prix figés : une commande ne doit pas changer si le catalogue bouge.
  name text not null,
  unit text,
  quantity numeric(10, 2) not null check (quantity > 0),
  unit_price numeric(10, 2) not null
);

create index order_items_order_idx on order_items (order_id);

-- --------------------------------------------------------------- Réservations
-- Absente du front : réserver un équipement affichait une confirmation sans
-- rien enregistrer, alors que c'est le cœur du métier.
create table bookings (
  id uuid primary key default uuid_generate_v4(),
  reference text not null unique,
  equipment_id uuid not null references equipment on delete restrict,
  renter_id uuid not null references profiles on delete cascade,
  start_date date not null,
  end_date date not null,
  days integer not null check (days > 0),
  price_per_day numeric(10, 2) not null,
  deposit numeric(10, 2) not null default 0,
  total numeric(10, 2) not null,
  status booking_status not null default 'pending',
  created_at timestamptz not null default now(),
  constraint bookings_date_order check (end_date >= start_date)
);

create index bookings_equipment_idx on bookings (equipment_id, start_date);
create index bookings_renter_idx on bookings (renter_id, created_at desc);

-- --------------------------------------------------- Devis et prise de contact
create table quotes (
  id uuid primary key default uuid_generate_v4(),
  -- Null si la demande vient d'un visiteur non connecté.
  user_id uuid references profiles on delete set null,
  full_name text not null,
  email text not null,
  phone text not null,
  company text,
  project_type text not null,
  project_location text not null,
  project_duration text not null,
  project_start_date text,
  equipment_types text[] not null default '{}',
  equipment_duration text,
  equipment_quantity integer,
  additional_requirements text,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

create table contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

-- --------------------------------------------- Création du profil à l'inscription
-- Sans ce déclencheur, un compte créé n'aurait ni nom ni rôle.
create function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.email,
    -- Le rôle demandé à l'inscription, borné à client/owner : « admin » ne peut
    -- pas être obtenu en le réclamant.
    case when new.raw_user_meta_data ->> 'role' = 'owner' then 'owner'::user_role
         else 'client'::user_role end
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
