import type { defineCollection } from "./collection";
import { jsonExtensionAdapter } from "./extension-adapters";
import { stringField } from "./field";

export type DefineConfigParams = {};
export type DefineConfigReturn = {
  collections: Array<ReturnType<typeof defineCollection>>;
};

export const defineConfig = <TReturn extends DefineConfigReturn>(
  fn: (params: DefineConfigParams) => TReturn
) => fn;

export const resolveConfig = (fn: ReturnType<typeof defineConfig>) => {
  const a = fn({});

  const b = {
    ...a,
    collections: a.collections.map((fn) =>
      fn({
        extensions: {
          json: () => jsonExtensionAdapter,
        },
      })
    ),
  };

  const c = {
    ...b,
    collections: b.collections.map((c) => ({
      ...c,
      fields: c.fields.map((fn) =>
        fn({
          fields: {
            string: stringField,
          },
        })
      ),
    })),
  };

  return c;
};