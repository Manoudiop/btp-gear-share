-- Candidatures pour devenir loueur.
--
-- Le formulaire « Devenir loueur » attendait une seconde et demie puis
-- remerciait le candidat, sans que personne ne reçoive rien.
--
-- Une candidature n'est ni un devis ni un message : elle porte une adresse, des
-- types d'équipements et un statut d'examen. La verser dans la boîte de contact
-- en aurait fait un bloc de texte que l'administration devrait relire à la main.

begin;

create table if not exists owner_applications (
  id uuid primary key default uuid_generate_v4(),
  -- Null si la candidature vient d'un visiteur non connecté.
  user_id uuid references profiles on delete set null,
  first_name text not null,
  last_name text not null,
  company text,
  email text not null,
  phone text not null,
  address text not null,
  city text not null,
  postal_code text not null,
  equipment_types text not null,
  description text,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

alter table owner_applications enable row level security;

-- Même principe que les devis : déposable par tous, lisible par personne
-- d'autre que l'administration et le candidat lui-même.
create policy "candidature déposable par tous"
  on owner_applications for insert with check (true);

create policy "candidatures lisibles par l'administration"
  on owner_applications for select using (is_admin() or user_id = auth.uid());

create policy "candidatures gérées par l'administration"
  on owner_applications for update using (is_admin());

commit;
