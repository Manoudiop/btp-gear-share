-- Jeu de données initial — FICHIER GÉNÉRÉ, ne pas éditer à la main.
-- Régénérer avec : node scripts/generate-seed.mjs

-- Les profils dépendent de auth.users : créez d'abord les comptes de
-- démonstration dans l'authentification Supabase, puis exécutez ce fichier.
-- Emails attendus :
--   client@btp.demo (client)
--   loueur@btp.demo (owner)
--   admin@btp.demo (admin)

begin;

-- Rattache les profils aux comptes créés dans l'authentification.
update profiles set name = 'Jean Dupont', role = 'client'::user_role, status = 'active'::user_status where email = 'jean.dupont@example.com';
update profiles set name = 'Marie Martin', role = 'owner'::user_role, status = 'active'::user_status where email = 'marie.martin@example.com';
update profiles set name = 'Paul Bernard', role = 'client'::user_role, status = 'inactive'::user_status where email = 'paul.bernard@example.com';
update profiles set name = 'Sophie Dubois', role = 'client'::user_role, status = 'suspended'::user_status where email = 'sophie.dubois@example.com';
update profiles set name = 'Thomas Leroy', role = 'admin'::user_role, status = 'active'::user_status where email = 'thomas.leroy@example.com';
update profiles set name = 'Laura Petit', role = 'owner'::user_role, status = 'active'::user_status where email = 'laura.petit@example.com';

-- Équipements. Le propriétaire est rattaché par son nom de compte.
insert into equipment (
  owner_id, name, description, category, price_per_day, deposit, location,
  image_url, features, insurance, specifications, status, availability,
  featured, response_time
)
select p.id, 'Pelleteuse Caterpillar 320', 'Pelleteuse hydraulique Caterpillar 320 en excellent état. Idéale pour les travaux d''excavation, de terrassement et de démolition. Puissance de 120 kW, poids opérationnel de 20 tonnes, profondeur de fouille maximale de 6,7 mètres.', 'Pelleteuses',
  350, 1000, 'Lyon', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  array['Cabine climatisée', 'Système GPS', 'Caméra de recul', 'Godet standard et godet de curage'], array['Dommages matériels', 'Vol', 'Bris de machine'], '{"weight":"20 tonnes","power":"120 kW","year":"2019","hours":"2500 heures","fuelType":"Diesel"}',
  'approved'::listing_status,
  'available'::listing_availability,
  false, '1h'
from profiles p where p.role = 'owner' limit 1
on conflict do nothing;

insert into equipment (
  owner_id, name, description, category, price_per_day, deposit, location,
  image_url, features, insurance, specifications, status, availability,
  featured, response_time
)
select p.id, 'Chargeuse JCB 437', 'Chargeuse sur pneus JCB 437 avec godet haute capacité. Parfaite pour le chargement de matériaux, le terrassement et la manutention sur chantier.', 'Chargeuses',
  280, 800, 'Marseille', 'https://images.unsplash.com/photo-1573611030146-ff6916c398f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  array['Climatisation', 'Pesage embarqué', 'Attache rapide hydraulique'], array['Dommages matériels', 'Vol'], '{"weight":"14 tonnes","power":"97 kW","year":"2020","hours":"1200 heures","fuelType":"Diesel"}',
  'approved'::listing_status,
  'available'::listing_availability,
  false, '2h'
from profiles p where p.role = 'owner' limit 1
on conflict do nothing;

insert into equipment (
  owner_id, name, description, category, price_per_day, deposit, location,
  image_url, features, insurance, specifications, status, availability,
  featured, response_time
)
select p.id, 'Camion benne Volvo FMX', 'Camion benne Volvo FMX 8x4 d''une capacité de 20 m³. Conçu pour l''évacuation de déblais et l''approvisionnement de chantiers difficiles d''accès. Benne à bascule arrière avec bâchage automatique.', 'Camions',
  420, 1200, 'Paris', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  array['Benne 20 m³', 'Bâchage automatique', 'Boîte automatique I-Shift', 'Suspension renforcée'], array['Dommages matériels', 'Vol', 'Responsabilité civile'], '{"capacity":"20 m³","power":"324 kW","year":"2021","mileage":"85 000 km","fuelType":"Diesel"}',
  'approved'::listing_status,
  'available'::listing_availability,
  false, '30 min'
from profiles p where p.role = 'owner' limit 1
on conflict do nothing;

insert into equipment (
  owner_id, name, description, category, price_per_day, deposit, location,
  image_url, features, insurance, specifications, status, availability,
  featured, response_time
)
select p.id, 'Bétonnière PRO 350L', 'Bétonnière professionnelle de 350 litres à cuve basculante. Adaptée aux chantiers de maçonnerie de taille moyenne : dalles, chapes et enduits.', 'Bétonnières',
  80, 250, 'Toulouse', 'https://images.unsplash.com/photo-1579165466741-7f35e4755183?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  array['Cuve 350 L', 'Châssis routier avec roues', 'Moteur électrique 230 V', 'Basculement par volant'], array['Dommages matériels'], '{"volume":"350 litres","power":"1,5 kW","year":"2022","voltage":"230 V","weight":"180 kg"}',
  'approved'::listing_status,
  'maintenance'::listing_availability,
  false, '3h'
from profiles p where p.role = 'owner' limit 1
on conflict do nothing;

insert into equipment (
  owner_id, name, description, category, price_per_day, deposit, location,
  image_url, features, insurance, specifications, status, availability,
  featured, response_time
)
select p.id, 'Marteau piqueur Bosch GSH 27', 'Marteau piqueur Bosch GSH 27 VC de 30 kg pour la démolition de béton armé, l''ouverture de tranchées et la reprise de fondations. Livré avec jeu de burins.', 'Marteaux piqueurs',
  60, 200, 'Nice', 'https://images.unsplash.com/photo-1622142377395-2210cbdad39e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  array['Système anti-vibration', 'Jeu de 3 burins inclus', 'Poignée pivotante', 'Puissance de frappe 62 J'], array['Dommages matériels', 'Vol'], '{"weight":"30 kg","power":"2000 W","impactEnergy":"62 J","year":"2021","voltage":"230 V"}',
  'approved'::listing_status,
  'available'::listing_availability,
  false, '2h'
from profiles p where p.role = 'owner' limit 1
on conflict do nothing;

insert into equipment (
  owner_id, name, description, category, price_per_day, deposit, location,
  image_url, features, insurance, specifications, status, availability,
  featured, response_time
)
select p.id, 'Échafaudage modulaire 8m', 'Échafaudage de façade modulaire d''une hauteur de travail de 8 mètres. Conforme à la norme NF EN 12811, garde-corps et plinthes inclus. Montage rapide sans outil.', 'Échafaudages',
  120, 400, 'Bordeaux', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  array['Hauteur de travail 8 m', 'Plateaux antidérapants', 'Garde-corps et plinthes', 'Montage sans outil'], array['Dommages matériels'], '{"height":"8 m","surface":"24 m²","load":"200 kg/m²","standard":"NF EN 12811","material":"Acier galvanisé"}',
  'approved'::listing_status,
  'available'::listing_availability,
  false, '4h'
from profiles p where p.role = 'owner' limit 1
on conflict do nothing;

insert into equipment (
  owner_id, name, description, category, price_per_day, deposit, location,
  image_url, features, insurance, specifications, status, availability,
  featured, response_time
)
select p.id, 'Pelleteuse Hitachi ZX350', 'Pelle sur chenilles Hitachi ZX350LC-6 de 35 tonnes. Machine de gros terrassement offrant une profondeur de fouille de 7,3 mètres et une excellente stabilité en pente.', 'Pelleteuses',
  380, 1100, 'Nantes', 'https://images.unsplash.com/photo-1506843561735-0e6b5a0e06fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  array['Chenilles longues (LC)', 'Cabine ROPS climatisée', 'Circuit hydraulique pour brise-roche', 'Godet 1,4 m³'], array['Dommages matériels', 'Vol', 'Bris de machine'], '{"weight":"35 tonnes","power":"202 kW","year":"2020","hours":"3100 heures","fuelType":"Diesel"}',
  'approved'::listing_status,
  'available'::listing_availability,
  false, '1h'
from profiles p where p.role = 'owner' limit 1
on conflict do nothing;

insert into equipment (
  owner_id, name, description, category, price_per_day, deposit, location,
  image_url, features, insurance, specifications, status, availability,
  featured, response_time
)
select p.id, 'Mini pelle Kubota KX91-3', 'Mini pelle Kubota KX91-3 de 3,5 tonnes, idéale pour les chantiers urbains et les accès étroits. Lame de remblayage et déport de flèche pour travailler au plus près des murs.', 'Pelleteuses',
  220, 600, 'Lille', 'https://images.unsplash.com/photo-1532343071564-5e97caaa9311?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  array['Poids 3,5 tonnes', 'Déport de flèche', 'Lame de remblayage', '3 godets fournis'], array['Dommages matériels', 'Vol'], '{"weight":"3,5 tonnes","power":"25 kW","year":"2021","hours":"1450 heures","fuelType":"Diesel"}',
  'approved'::listing_status,
  'available'::listing_availability,
  false, '1h30'
from profiles p where p.role = 'owner' limit 1
on conflict do nothing;

insert into equipment (
  owner_id, name, description, category, price_per_day, deposit, location,
  image_url, features, insurance, specifications, status, availability,
  featured, response_time
)
select p.id, 'Scie circulaire Makita', 'Scie circulaire Makita 5008MG à lame de 210 mm, carter magnésium. Coupe jusqu''à 75,5 mm de profondeur, idéale pour la charpente et le coffrage.', 'Outillage',
  40, 150, 'Strasbourg', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  array['Lame 210 mm', 'Carter magnésium léger', 'Éclairage LED', 'Guide parallèle inclus'], array['Dommages matériels'], '{"bladeDiameter":"210 mm","power":"1800 W","cuttingDepth":"75,5 mm","year":"2022","weight":"5,1 kg"}',
  'approved'::listing_status,
  'available'::listing_availability,
  false, '5h'
from profiles p where p.role = 'owner' limit 1
on conflict do nothing;

-- Matériaux.
insert into materials (
  supplier_name, name, description, category, price, unit, min_order, max_order,
  stock, location, image_url, features, specifications, is_available
) values (
  'Matériaux Express', 'Sable de construction fin', 'Sable fin de construction de haute qualité, parfait pour les travaux de maçonnerie, la préparation du mortier et du béton. Granulométrie 0/4mm, conforme aux normes NF EN 12620 et NF EN 13139.',
  'Sable', 45, 'tonne', 1,
  20, 500, 'Lyon', 'https://images.unsplash.com/photo-1582469566055-5216648cc753?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  array['Granulométrie 0/4mm', 'Sable lavé', 'Conforme aux normes européennes', 'Livraison possible'], '{"granulometry":"0/4mm","density":"1.6 t/m³","source":"Carrière certifiée","color":"Beige","packaging":"Vrac"}', true
) on conflict do nothing;
insert into delivery_options (material_id, type, delay, price)
select m.id, 'Standard', '3-5 jours', 50
from materials m where m.name = 'Sable de construction fin'
on conflict do nothing;
insert into delivery_options (material_id, type, delay, price)
select m.id, 'Express', '24h', 90
from materials m where m.name = 'Sable de construction fin'
on conflict do nothing;
insert into delivery_options (material_id, type, delay, price)
select m.id, 'Sur-mesure', 'À convenir', null
from materials m where m.name = 'Sable de construction fin'
on conflict do nothing;

insert into materials (
  supplier_name, name, description, category, price, unit, min_order, max_order,
  stock, location, image_url, features, specifications, is_available
) values (
  'Ciments de France', 'Ciment Portland 32.5', 'Ciment Portland de type CEM II/B-L 32,5 R, idéal pour les travaux courants de maçonnerie, les chapes et les fondations. Conforme à la norme NF EN 197-1.',
  'Ciment', 95, 'tonne', 0.5,
  10, 200, 'Paris', 'https://images.unsplash.com/photo-1604163546180-039a1781c0d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  array['Prise rapide', 'Résistance 32.5 MPa', 'Conditionnement en sacs ou vrac', 'Excellente maniabilité'], '{"type":"CEM II/B-L 32,5 R","resistance":"32.5 MPa","setting":"Prise normale","packaging":"Sacs 35kg ou vrac","color":"Gris"}', true
) on conflict do nothing;
insert into delivery_options (material_id, type, delay, price)
select m.id, 'Standard', '2-4 jours', 60
from materials m where m.name = 'Ciment Portland 32.5'
on conflict do nothing;
insert into delivery_options (material_id, type, delay, price)
select m.id, 'Express', '24h', 100
from materials m where m.name = 'Ciment Portland 32.5'
on conflict do nothing;

insert into materials (
  supplier_name, name, description, category, price, unit, min_order, max_order,
  stock, location, image_url, features, specifications, is_available
) values (
  'Béton Solutions', 'Béton prêt à l''emploi C25/30', 'Béton prêt à l''emploi de classe C25/30, adapté pour les structures soumises à des contraintes modérées. Livré par camion toupie pour garantir une qualité optimale.',
  'Béton', 110, 'm³', 1,
  15, 150, 'Marseille', 'https://images.unsplash.com/photo-1566027310713-1d34d3c2c654?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  array['Classe d''exposition XC2', 'Consistance S3', 'Taille des granulats 16mm', 'Pompage possible'], '{"class":"C25/30","exposure":"XC2","consistency":"S3","aggregates":"16mm","cement":"CEM II"}', true
) on conflict do nothing;
insert into delivery_options (material_id, type, delay, price)
select m.id, 'Standard', 'Sur rendez-vous', 80
from materials m where m.name = 'Béton prêt à l''emploi C25/30'
on conflict do nothing;
insert into delivery_options (material_id, type, delay, price)
select m.id, 'Express', '24h', 150
from materials m where m.name = 'Béton prêt à l''emploi C25/30'
on conflict do nothing;

insert into materials (
  supplier_name, name, description, category, price, unit, min_order, max_order,
  stock, location, image_url, features, specifications, is_available
) values (
  'Carrières du Sud', 'Gravier 20/40mm', 'Gravier concassé calibre 20/40mm issu de carrière certifiée. Utilisé pour les drainages, les hérissons sous dalle, les allées et les lits de pose.',
  'Agrégats', 38, 'tonne', 1,
  30, 800, 'Nîmes', 'https://images.unsplash.com/photo-1518406432532-9cbef5697723?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  array['Calibre 20/40mm', 'Roche calcaire concassée', 'Excellent drainage', 'Livraison en vrac'], '{"granulometry":"20/40mm","density":"1.5 t/m³","source":"Carrière certifiée","color":"Gris clair","packaging":"Vrac ou big bag"}', true
) on conflict do nothing;
insert into delivery_options (material_id, type, delay, price)
select m.id, 'Standard', '3-5 jours', 45
from materials m where m.name = 'Gravier 20/40mm'
on conflict do nothing;
insert into delivery_options (material_id, type, delay, price)
select m.id, 'Express', '48h', 85
from materials m where m.name = 'Gravier 20/40mm'
on conflict do nothing;

insert into materials (
  supplier_name, name, description, category, price, unit, min_order, max_order,
  stock, location, image_url, features, specifications, is_available
) values (
  'Terres & Jardins', 'Terre végétale amendée', 'Terre végétale criblée et amendée en compost, prête à l''emploi pour l''engazonnement, les massifs et les plantations d''arbustes.',
  'Terre', 55, 'm³', 1,
  25, 0, 'Bordeaux', 'https://images.unsplash.com/photo-1595915636540-3142ee10d19c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  array['Criblée à 20mm', 'Amendée en compost végétal', 'Sans cailloux ni racines', 'pH neutre'], '{"screening":"20mm","organicMatter":"12 %","ph":"6,8","density":"1.3 t/m³","packaging":"Vrac"}', false
) on conflict do nothing;
insert into delivery_options (material_id, type, delay, price)
select m.id, 'Standard', '5-7 jours', 55
from materials m where m.name = 'Terre végétale amendée'
on conflict do nothing;

insert into materials (
  supplier_name, name, description, category, price, unit, min_order, max_order,
  stock, location, image_url, features, specifications, is_available
) values (
  'Matériaux Express', 'Sable de rivière lavé', 'Sable de rivière roulé et lavé, granulométrie 0/2mm. Sa forme arrondie en fait le sable de référence pour les enduits de finition et les mortiers de jointoiement.',
  'Sable', 52, 'tonne', 1,
  20, 350, 'Lyon', 'https://images.unsplash.com/photo-1600007277799-44736c28e2f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  array['Granulométrie 0/2mm', 'Grains roulés', 'Lavé et séché', 'Idéal enduits de finition'], '{"granulometry":"0/2mm","density":"1.5 t/m³","source":"Rivière","color":"Ocre clair","packaging":"Vrac ou big bag"}', true
) on conflict do nothing;
insert into delivery_options (material_id, type, delay, price)
select m.id, 'Standard', '3-5 jours', 50
from materials m where m.name = 'Sable de rivière lavé'
on conflict do nothing;
insert into delivery_options (material_id, type, delay, price)
select m.id, 'Express', '24h', 90
from materials m where m.name = 'Sable de rivière lavé'
on conflict do nothing;

commit;
