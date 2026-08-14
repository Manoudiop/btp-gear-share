-- Nom du loueur sur les annonces.
--
-- Le catalogue public affiche le nom du loueur, mais la jointure vers `profiles`
-- ne renvoyait rien : la table n'est lisible que par son titulaire. L'ouvrir
-- publiquement exposerait aussi les emails, téléphones et adresses.
--
-- Le nom est donc recopié sur l'annonce. C'est une dénormalisation assumée : un
-- catalogue se lit bien plus souvent qu'un loueur ne change de nom, et les
-- coordonnées restent privées.

begin;

alter table equipment add column if not exists owner_name text not null default '';

update equipment e
set owner_name = p.name
from profiles p
where p.id = e.owner_id and e.owner_name = '';

-- Garde la copie à jour quand le loueur change de nom.
create or replace function sync_owner_name()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update equipment set owner_name = new.name where owner_id = new.id;
  return new;
end;
$$;

drop trigger if exists profiles_sync_owner_name on profiles;
create trigger profiles_sync_owner_name
  after update of name on profiles
  for each row execute function sync_owner_name();

-- Renseigne le nom à la création d'une annonce, sans le demander au client.
create or replace function set_owner_name()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  select name into new.owner_name from profiles where id = new.owner_id;
  return new;
end;
$$;

drop trigger if exists equipment_set_owner_name on equipment;
create trigger equipment_set_owner_name
  before insert on equipment
  for each row execute function set_owner_name();

-- ------------------------------------- Auteurs des avis et des questions
-- Même raison : la fiche affiche le nom de l'auteur d'un avis, que la table des
-- profils ne laisse pas lire à un visiteur.
alter table reviews add column if not exists author_name text not null default '';
alter table questions add column if not exists author_name text not null default '';

update reviews r set author_name = p.name from profiles p
where p.id = r.author_id and r.author_name = '';

update questions q set author_name = p.name from profiles p
where p.id = q.author_id and q.author_name = '';

create or replace function set_author_name()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  select name into new.author_name from profiles where id = new.author_id;
  return new;
end;
$$;

drop trigger if exists reviews_set_author_name on reviews;
create trigger reviews_set_author_name
  before insert on reviews
  for each row execute function set_author_name();

drop trigger if exists questions_set_author_name on questions;
create trigger questions_set_author_name
  before insert on questions
  for each row execute function set_author_name();

commit;
