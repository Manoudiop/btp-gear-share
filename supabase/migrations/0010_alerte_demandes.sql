-- Alerter l'administration d'une demande entrante.
--
-- Messages, devis et candidatures s'empilaient en base sans que personne ne
-- soit prévenu : il fallait penser à ouvrir l'écran des demandes.
--
-- L'envoi part de la base plutôt que du navigateur. Le client n'a que la clé
-- publique : lui confier l'appel au fournisseur d'emails reviendrait à exposer
-- la clé de ce dernier, et à laisser n'importe qui déclencher des envois.
--
-- Deux principes tiennent tout le fichier :
--   1. une notification ne doit jamais faire échouer la demande qu'elle annonce ;
--   2. la clé du fournisseur ne doit jamais être lisible depuis l'application.

begin;

-- pg_net poste en arrière-plan : la requête HTTP est mise en file, elle ne
-- retient pas la transaction qui l'a demandée.
create extension if not exists pg_net with schema extensions;

-- ------------------------------------------------------------------ Réglages
-- Une seule ligne, garantie par une clé primaire booléenne contrainte à vrai.
create table if not exists notification_settings (
  id boolean primary key default true check (id),
  /** Adresse qui reçoit les alertes. */
  recipient text not null,
  /** Expéditeur déclaré au fournisseur ; doit appartenir à un domaine vérifié. */
  sender text not null default 'Buildora <onboarding@resend.dev>',
  enabled boolean not null default true
);

alter table notification_settings enable row level security;

drop policy if exists "réglages réservés à l'administration" on notification_settings;
create policy "réglages réservés à l'administration"
  on notification_settings for all using (is_admin()) with check (is_admin());

insert into notification_settings (id, recipient, enabled)
values (true, 'changez-moi@example.com', false)
on conflict (id) do nothing;

-- ---------------------------------------------------------------- Envoi
create or replace function notify_new_request()
returns trigger
language plpgsql
security definer set search_path = public, extensions
as $$
declare
  reglages notification_settings;
  cle text;
  sujet text;
  corps text;
begin
  select * into reglages from notification_settings where id;
  if reglages is null or not reglages.enabled then
    return new;
  end if;

  -- La clé vit dans le coffre, jamais dans une colonne lisible.
  select decrypted_secret into cle
  from vault.decrypted_secrets
  where name = 'RESEND_API_KEY';

  if cle is null then
    return new;
  end if;

  if TG_TABLE_NAME = 'contact_messages' then
    sujet := 'Nouveau message : ' || new.subject;
    corps := new.name || ' (' || new.email || ')' || E'\n\n' || new.message;

  elsif TG_TABLE_NAME = 'quotes' then
    sujet := 'Nouvelle demande de devis';
    corps := new.full_name || ' (' || new.email || ')' || E'\n'
          || 'Projet : ' || new.project_type || E'\n'
          || 'Lieu : ' || new.project_location || E'\n'
          || 'Durée : ' || new.project_duration;

  elsif TG_TABLE_NAME = 'owner_applications' then
    sujet := 'Nouvelle candidature de loueur';
    corps := new.first_name || ' ' || new.last_name || ' (' || new.email || ')' || E'\n'
          || 'Ville : ' || new.city || E'\n'
          || 'Équipements : ' || new.equipment_types;

  else
    return new;
  end if;

  perform net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || cle,
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'from', reglages.sender,
      'to', jsonb_build_array(reglages.recipient),
      'subject', sujet,
      'text', corps || E'\n\n— Envoyé automatiquement par Buildora.'
    )
  );

  return new;
exception
  -- Une alerte qui échoue ne doit pas perdre la demande : le formulaire a
  -- rendu la main à l'utilisateur, la ligne doit rester.
  when others then
    raise warning 'Alerte non envoyée (%): %', TG_TABLE_NAME, sqlerrm;
    return new;
end;
$$;

drop trigger if exists contact_messages_notify on contact_messages;
create trigger contact_messages_notify
  after insert on contact_messages
  for each row execute function notify_new_request();

drop trigger if exists quotes_notify on quotes;
create trigger quotes_notify
  after insert on quotes
  for each row execute function notify_new_request();

drop trigger if exists owner_applications_notify on owner_applications;
create trigger owner_applications_notify
  after insert on owner_applications
  for each row execute function notify_new_request();

commit;

-- Mise en route, une fois le fichier exécuté :
--
--   1. Créer un compte sur resend.com et y obtenir une clé d'API.
--   2. Déposer la clé dans le coffre — jamais dans une table, jamais dans le
--      dépôt Git :
--        select vault.create_secret('re_votre_cle', 'RESEND_API_KEY');
--   3. Renseigner l'adresse qui reçoit, puis activer :
--        update notification_settings
--        set recipient = 'vous@votredomaine.com', enabled = true;
--   4. Vérifier l'envoi après une demande de test :
--        select status_code, content from net._http_response
--        order by created desc limit 1;
--
-- Tant que l'étape 2 ou 3 manque, les demandes sont enregistrées normalement et
-- aucune alerte n'est tentée.
