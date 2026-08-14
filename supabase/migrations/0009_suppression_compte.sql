-- Suppression d'un compte depuis l'administration.
--
-- Le back-office propose de supprimer un utilisateur. Effacer seulement son
-- profil laisserait un compte d'authentification orphelin : la personne pourrait
-- encore se connecter, mais sur une session sans profil — donc cassée.
--
-- Supprimer le compte lui-même demande des droits qu'une clé publique n'a pas et
-- ne doit jamais avoir. La suppression passe donc par une fonction serveur, qui
-- vérifie elle-même que l'appelant est administrateur avant d'agir.

begin;

create or replace function admin_delete_user(target uuid)
returns void
language plpgsql
security definer set search_path = public, auth
as $$
begin
  if not is_admin() then
    raise exception 'Réservé à l''administration.' using errcode = '42501';
  end if;

  -- Un administrateur qui se supprime lui-même verrouillerait la plateforme.
  if target = auth.uid() then
    raise exception 'Un administrateur ne peut pas supprimer son propre compte.'
      using errcode = '42501';
  end if;

  -- Le profil et tout ce qui en dépend partent en cascade.
  delete from auth.users where id = target;
end;
$$;

revoke all on function admin_delete_user(uuid) from public;
grant execute on function admin_delete_user(uuid) to authenticated;

commit;
