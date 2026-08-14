-- Nom du locataire sur la réservation.
--
-- Le loueur voit ses réservations, mais pas qui les a prises : la jointure vers
-- `profiles` ne renvoie rien, cette table n'étant lisible que par son titulaire.
-- L'ouvrir au loueur exposerait aussi l'email, le téléphone et l'adresse.
--
-- Le nom est donc recopié sur la réservation, comme il l'est déjà sur les
-- annonces et les avis. Une réservation est de toute façon un instantané : le
-- nom qui y figure est celui du jour où elle a été prise.

begin;

alter table bookings add column if not exists renter_name text not null default '';

update bookings b
set renter_name = p.name
from profiles p
where p.id = b.renter_id and b.renter_name = '';

create or replace function set_renter_name()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  select name into new.renter_name from profiles where id = new.renter_id;
  return new;
end;
$$;

drop trigger if exists bookings_set_renter_name on bookings;
create trigger bookings_set_renter_name
  before insert on bookings
  for each row execute function set_renter_name();

commit;
