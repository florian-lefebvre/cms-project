import type { APIRoute } from "astro";
import path from "node:path";
import fsp from "node:fs/promises";
import { config } from "../../lib/test";

export const POST: APIRoute = async ({ request, redirect }) => {
  const { _collection, ..._data } = Object.fromEntries(
    (await request.formData()).entries()
  );

  const collection = config.collections.find((c) => c.name === _collection)!;

  const file = path.resolve(
    collection.path,
    `${collection.slug(_data)}.${collection.extension.name}`
  );
  const data = collection.extension.serialize(_data);

  await fsp.writeFile(file, data, "utf-8");

  return redirect("/");
};
