-- Rend le jeu de données initial rejouable.
--
-- `seed.sql` s'appuyait sur `on conflict do nothing` sans qu'aucune contrainte
-- d'unicité ne l'appuie : la clause ne protégeait rien et un second passage
-- dupliquait tout le catalogue. Cette migration nettoie les doublons éventuels
-- puis pose les contraintes qui manquaient.

begin;

-- ----------------------------------------------- Nettoyage des doublons
-- Conserve la ligne la plus ancienne de chaque nom, supprime les suivantes.
delete from materials m
using materials autre
where m.name = autre.name
  and m.ctid > autre.ctid;

delete from equipment e
using equipment autre
where e.name = autre.name
  and e.owner_id = autre.owner_id
  and e.ctid > autre.ctid;

-- Les options rattachées à un matériau supprimé sont parties avec lui ; restent
-- celles insérées plusieurs fois sur un même matériau.
delete from delivery_options d
using delivery_options autre
where d.material_id = autre.material_id
  and d.type = autre.type
  and d.ctid > autre.ctid;

-- --------------------------------------------------------- Contraintes
-- Postgres n'accepte pas `add constraint if not exists` : on retire d'abord la
-- contrainte éventuelle, ce qui rend le fichier rejouable sans erreur.
alter table materials drop constraint if exists materials_name_key;
alter table materials add constraint materials_name_key unique (name);

alter table equipment drop constraint if exists equipment_owner_name_key;
alter table equipment add constraint equipment_owner_name_key unique (owner_id, name);

alter table delivery_options drop constraint if exists delivery_options_material_type_key;
alter table delivery_options
  add constraint delivery_options_material_type_key unique (material_id, type);

commit;
