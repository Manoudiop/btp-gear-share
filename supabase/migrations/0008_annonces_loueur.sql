-- Déposer une annonce depuis l'espace loueur.
--
-- Le formulaire d'ajout attendait une seconde et demie puis annonçait la
-- création de l'équipement, avant de rediriger vers une liste où il n'était pas.
-- Deux choses manquaient pour qu'il écrive vraiment.

begin;

-- 1. La durée minimale de location était saisie et jetée : aucune colonne ne
--    l'accueillait.
alter table equipment
  add column if not exists min_rental_days integer not null default 1
  check (min_rental_days > 0);

commit;

-- 2. Les photos n'avaient nulle part où aller. Un dépôt public en lecture : une
--    annonce est faite pour être vue, y compris par un visiteur non connecté.
insert into storage.buckets (id, name, public)
values ('equipment', 'equipment', true)
on conflict (id) do nothing;

-- L'écriture, elle, reste réservée aux comptes connectés, et chacun ne touche
-- qu'au dossier portant son identifiant.
drop policy if exists "photos d'annonces visibles de tous" on storage.objects;
create policy "photos d'annonces visibles de tous"
  on storage.objects for select
  using (bucket_id = 'equipment');

drop policy if exists "loueur dépose ses photos" on storage.objects;
create policy "loueur dépose ses photos"
  on storage.objects for insert
  with check (
    bucket_id = 'equipment'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "loueur remplace ses photos" on storage.objects;
create policy "loueur remplace ses photos"
  on storage.objects for update
  using (
    bucket_id = 'equipment'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "loueur supprime ses photos" on storage.objects;
create policy "loueur supprime ses photos"
  on storage.objects for delete
  using (
    bucket_id = 'equipment'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
