-- Note et nombre d'avis sur les catalogues.
--
-- Oubli du schéma initial : les cartes et les fiches affichent une note, mais
-- aucune colonne ne la portait. La note est dénormalisée plutôt que recalculée
-- à chaque lecture — un catalogue se lit bien plus souvent qu'il ne reçoit
-- d'avis, et le tri par note doit rester indexable.

begin;

alter table equipment
  add column if not exists rating numeric(2, 1) not null default 0
    check (rating >= 0 and rating <= 5),
  add column if not exists review_count integer not null default 0;

alter table materials
  add column if not exists rating numeric(2, 1) not null default 0
    check (rating >= 0 and rating <= 5),
  add column if not exists review_count integer not null default 0;

create index if not exists equipment_rating_idx on equipment (rating desc);

-- Tient la note à jour quand un avis est déposé, modifié ou supprimé.
create or replace function refresh_rating()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  cible_equipment uuid := coalesce(new.equipment_id, old.equipment_id);
  cible_material uuid := coalesce(new.material_id, old.material_id);
begin
  if cible_equipment is not null then
    update equipment e
    set rating = coalesce((select round(avg(r.rating), 1) from reviews r where r.equipment_id = e.id), 0),
        review_count = (select count(*) from reviews r where r.equipment_id = e.id)
    where e.id = cible_equipment;
  end if;

  if cible_material is not null then
    update materials m
    set rating = coalesce((select round(avg(r.rating), 1) from reviews r where r.material_id = m.id), 0),
        review_count = (select count(*) from reviews r where r.material_id = m.id)
    where m.id = cible_material;
  end if;

  return null;
end;
$$;

drop trigger if exists reviews_refresh_rating on reviews;
create trigger reviews_refresh_rating
  after insert or update or delete on reviews
  for each row execute function refresh_rating();

commit;
