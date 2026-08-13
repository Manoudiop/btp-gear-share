-- Sécurité par ligne.
--
-- C'est ici que se joue l'autorisation réelle. Côté front, `PrivateRoute` ne
-- fait que masquer des écrans : il suffit d'éditer le localStorage pour se
-- déclarer administrateur. Les règles ci-dessous, elles, sont appliquées par la
-- base et ne peuvent pas être contournées depuis le navigateur.

-- Lit le rôle de l'appelant sans repasser par les règles de `profiles`, ce qui
-- provoquerait une récursion infinie.
create function auth_role()
returns user_role
language sql
stable
security definer set search_path = public
as $$
  select role from profiles where id = auth.uid();
$$;

create function is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select coalesce((select role from profiles where id = auth.uid()) = 'admin', false);
$$;

alter table profiles enable row level security;
alter table equipment enable row level security;
alter table equipment_availability enable row level security;
alter table materials enable row level security;
alter table delivery_options enable row level security;
alter table reviews enable row level security;
alter table questions enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table bookings enable row level security;
alter table quotes enable row level security;
alter table contact_messages enable row level security;

-- ------------------------------------------------------------------- Profils
create policy "profil visible par son titulaire"
  on profiles for select using (id = auth.uid() or is_admin());

create policy "profil modifiable par son titulaire"
  on profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy "administration gère les profils"
  on profiles for all using (is_admin()) with check (is_admin());

-- --------------------------------------------------------------- Équipements
-- Le catalogue public ne montre que ce qui est approuvé ; le loueur voit aussi
-- ses annonces en attente ou rejetées.
create policy "catalogue approuvé visible de tous"
  on equipment for select
  using (status = 'approved' or owner_id = auth.uid() or is_admin());

create policy "loueur crée ses annonces"
  on equipment for insert
  with check (owner_id = auth.uid() and auth_role() in ('owner', 'admin'));

create policy "loueur modifie ses annonces"
  on equipment for update
  using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "loueur supprime ses annonces"
  on equipment for delete using (owner_id = auth.uid());

create policy "administration gère le catalogue"
  on equipment for all using (is_admin()) with check (is_admin());

create policy "disponibilités visibles de tous"
  on equipment_availability for select using (true);

create policy "loueur gère ses disponibilités"
  on equipment_availability for all
  using (
    exists (
      select 1 from equipment e
      where e.id = equipment_id and (e.owner_id = auth.uid() or is_admin())
    )
  )
  with check (
    exists (
      select 1 from equipment e
      where e.id = equipment_id and (e.owner_id = auth.uid() or is_admin())
    )
  );

-- ----------------------------------------------------------------- Matériaux
create policy "matériaux visibles de tous"
  on materials for select using (true);

create policy "administration gère les matériaux"
  on materials for all using (is_admin()) with check (is_admin());

create policy "options de livraison visibles de tous"
  on delivery_options for select using (true);

create policy "administration gère les options de livraison"
  on delivery_options for all using (is_admin()) with check (is_admin());

-- -------------------------------------------------------- Avis et questions
create policy "avis visibles de tous"
  on reviews for select using (true);

create policy "avis déposé en son nom"
  on reviews for insert with check (author_id = auth.uid());

create policy "avis modifiable par son auteur"
  on reviews for update using (author_id = auth.uid()) with check (author_id = auth.uid());

create policy "avis supprimable par son auteur ou l'administration"
  on reviews for delete using (author_id = auth.uid() or is_admin());

create policy "questions visibles de tous"
  on questions for select using (true);

create policy "question posée en son nom"
  on questions for insert with check (author_id = auth.uid());

-- Seul le loueur concerné peut répondre.
create policy "loueur répond aux questions"
  on questions for update
  using (
    exists (
      select 1 from equipment e
      where e.id = equipment_id and (e.owner_id = auth.uid() or is_admin())
    )
  );

-- ------------------------------------------------------------------ Commandes
create policy "commandes visibles par leur client"
  on orders for select using (user_id = auth.uid() or is_admin());

create policy "commande passée en son nom"
  on orders for insert with check (user_id = auth.uid());

create policy "administration gère les commandes"
  on orders for all using (is_admin()) with check (is_admin());

create policy "lignes visibles avec leur commande"
  on order_items for select
  using (
    exists (
      select 1 from orders o
      where o.id = order_id and (o.user_id = auth.uid() or is_admin())
    )
  );

create policy "lignes ajoutées avec leur commande"
  on order_items for insert
  with check (exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid()));

-- --------------------------------------------------------------- Réservations
-- Visible du locataire et du loueur de l'équipement concerné.
create policy "réservations visibles des deux parties"
  on bookings for select
  using (
    renter_id = auth.uid()
    or exists (select 1 from equipment e where e.id = equipment_id and e.owner_id = auth.uid())
    or is_admin()
  );

create policy "réservation prise en son nom"
  on bookings for insert with check (renter_id = auth.uid());

create policy "réservation mise à jour par les deux parties"
  on bookings for update
  using (
    renter_id = auth.uid()
    or exists (select 1 from equipment e where e.id = equipment_id and e.owner_id = auth.uid())
    or is_admin()
  );

-- --------------------------------------------------- Devis et prise de contact
-- Déposables par un visiteur non connecté, lisibles seulement par l'administration.
create policy "devis déposable par tous"
  on quotes for insert with check (true);

create policy "devis lisibles par l'administration"
  on quotes for select using (is_admin() or user_id = auth.uid());

create policy "devis gérés par l'administration"
  on quotes for update using (is_admin());

create policy "message déposable par tous"
  on contact_messages for insert with check (true);

create policy "messages lisibles par l'administration"
  on contact_messages for select using (is_admin());

create policy "messages gérés par l'administration"
  on contact_messages for update using (is_admin());
