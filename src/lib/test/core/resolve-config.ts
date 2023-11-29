import { resolveField } from ".";
import type {
  Collection,
  CollectionReturn,
  Config,
  ConfigReturn,
  Extension,
  FieldReturn,
} from "../types";

export const resolveConfig = <
  TCollection extends Collection<any>,
  TReturn extends ConfigReturn<TCollection>
>(
  fn: Config<TCollection, TReturn>
) => {
  const extensions: Array<Extension> = [];
  const fieldsFns: Array<
    (params: FieldReturn<any, any>) => FieldReturn<any, any>
  > = [];

  const a = fn({});

  for (const module of a.modules ?? []) {
    module.setup({
      addExtension: (e) => extensions.push(e),
      addField: (e) => fieldsFns.push(e),
      addWidget: (e) => {},
    });
  }

  const b = {
    ...a,
    modules: a.modules ?? [],
    collections: a.collections.map((fn) =>
      fn({
        extensions: Object.fromEntries(
          extensions.map((e) => [e.name, () => e])
        ) as any,
      })
    ) as Array<CollectionReturn>,
  };

  const c = {
    ...b,
    collections: (b.collections as Array<CollectionReturn>).map((c) => ({
      ...c,
      fields: c.fields.map((fn) =>
        resolveField(
          fn({
            fields: Object.fromEntries(
              fieldsFns.map((e) => ["string", e])
            ) as any,
          }),
          { widgets: {} }
        )
      ),
    })),
  };

  return c;
};
