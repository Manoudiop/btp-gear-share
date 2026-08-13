/**
 * Produit `supabase/seed.sql` à partir du catalogue défini dans `src/data/`.
 *
 * Le jeu de données initial est ainsi toujours le reflet exact du catalogue
 * front, plutôt qu'une transcription manuelle qui dériverait à la première
 * modification. À relancer après chaque ajout d'équipement ou de matériau :
 *
 *     node scripts/generate-seed.mjs
 */
import { build } from "esbuild";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

// `users.ts` importe le magasin d'état, qui importe React. Rien n'est appelé
// ici : un module de remplacement suffit à satisfaire l'import.
const REACT_STUB = `
export const useEffect = () => {};
export const useState = (initial) => [typeof initial === "function" ? initial() : initial, () => {}];
export default { useEffect, useState };
`;

const quote = (value) => {
  if (value === null || value === undefined) return "null";
  return `'${String(value).replace(/'/g, "''")}'`;
};

const array = (values) =>
  values?.length ? `array[${values.map(quote).join(", ")}]` : "'{}'";

const json = (value) => quote(JSON.stringify(value ?? {}));

const bool = (value) => (value ? "true" : "false");

const main = async () => {
  const dir = await mkdtemp(join(tmpdir(), "btp-seed-"));
  const stub = join(dir, "react-stub.mjs");
  const bundle = join(dir, "data.mjs");

  await writeFile(stub, REACT_STUB, "utf8");

  await build({
    stdin: {
      contents: `
        export { equipment } from "./src/data/equipment.ts";
        export { materials } from "./src/data/materials.ts";
        export { seedUsers as users, demoAccounts } from "./src/data/users.ts";
      `,
      resolveDir: process.cwd(),
      loader: "ts",
    },
    bundle: true,
    format: "esm",
    platform: "node",
    outfile: bundle,
    alias: { react: stub },
    logLevel: "silent",
  });

  const { equipment, materials, users, demoAccounts } = await import(
    pathToFileURL(bundle).href
  );

  const lines = [];
  const push = (line = "") => lines.push(line);

  push("-- Jeu de données initial — FICHIER GÉNÉRÉ, ne pas éditer à la main.");
  push("-- Régénérer avec : node scripts/generate-seed.mjs");
  push();
  push("-- Les profils dépendent de auth.users : créez d'abord les comptes de");
  push("-- démonstration dans l'authentification Supabase, puis exécutez ce fichier.");
  push("-- Emails attendus :");
  demoAccounts.forEach((account) => push(`--   ${account.email} (${account.role})`));
  push();

  // Un identifiant stable par enregistrement rend le script rejouable.
  push("begin;");
  push();
  push("-- Rattache les profils aux comptes créés dans l'authentification.");
  users.forEach((user) => {
    push(
      `update profiles set name = ${quote(user.name)}, role = ${quote(user.role)}::user_role, ` +
        `status = ${quote(user.status)}::user_status where email = ${quote(user.email)};`,
    );
  });
  push();

  push("-- Équipements. Le propriétaire est rattaché par son nom de compte.");
  equipment.forEach((item) => {
    push(`insert into equipment (
  owner_id, name, description, category, price_per_day, deposit, location,
  image_url, features, insurance, specifications, status, availability,
  featured, response_time
)
select p.id, ${quote(item.name)}, ${quote(item.description)}, ${quote(item.category)},
  ${item.price}, ${item.deposit}, ${quote(item.location)}, ${quote(item.image)},
  ${array(item.features)}, ${array(item.insurance)}, ${json(item.specifications)},
  'approved'::listing_status,
  ${item.isAvailable ? "'available'" : "'maintenance'"}::listing_availability,
  false, ${quote(item.ownerResponseTime)}
from profiles p where p.role = 'owner' limit 1
on conflict do nothing;`);
    push();
  });

  push("-- Matériaux.");
  materials.forEach((item) => {
    push(`insert into materials (
  supplier_name, name, description, category, price, unit, min_order, max_order,
  stock, location, image_url, features, specifications, is_available
) values (
  ${quote(item.supplier)}, ${quote(item.name)}, ${quote(item.description)},
  ${quote(item.category)}, ${item.price}, ${quote(item.unit)}, ${item.minOrder},
  ${item.maxOrder}, ${item.stock}, ${quote(item.location)}, ${quote(item.image)},
  ${array(item.features)}, ${json(item.specifications)}, ${bool(item.isAvailable)}
) on conflict do nothing;`);

    (item.deliveryOptions ?? []).forEach((option) => {
      const price = typeof option.price === "number" ? option.price : "null";
      push(`insert into delivery_options (material_id, type, delay, price)
select m.id, ${quote(option.type)}, ${quote(option.delay)}, ${price}
from materials m where m.name = ${quote(item.name)}
on conflict do nothing;`);
    });
    push();
  });

  push("commit;");
  push();

  await writeFile("supabase/seed.sql", lines.join("\n"), "utf8");
  await rm(dir, { recursive: true, force: true });

  console.log(
    `seed.sql généré : ${equipment.length} équipements, ${materials.length} matériaux, ${users.length} profils`,
  );
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
