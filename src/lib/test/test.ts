import type { Extension } from ".";
import {
  defineCollection,
  resolveConfig,
  defineConfig,
  defineField,
  defineExtension,
} from "./core";
import { createField, createModule } from "./kit";

declare module "." {
  interface Extensions {
    json: () => Extension;
  }
  interface Fields {
    string: typeof stringField;
  }
}

const jsonExtension = defineExtension({
  name: "json",
  serialize: (v: unknown) => JSON.stringify(v, null, 2),
  parse: (v: string) => JSON.parse(v),
});

const stringField = createField<{ minLength?: number }>(({ widgets }) => ({
  metadata: { type: "string", widget: null },
}));

const myModule = createModule({
  id: "my-module",
  setup({ addExtension, addField, addWidget }) {
    addExtension(jsonExtension);
    addField(stringField);
  },
});

const rawConfig = defineConfig(() => ({
  modules: [myModule],
  collections: [
    defineCollection(({ extensions }) => ({
      name: "posts",
      label: "Posts",
      slug: () => "",
      path: "content/posts",
      extension: extensions.json(),
      fields: [
        defineField(({ fields }) =>
          fields.string({ name: "title", label: "Title", minLength: 5 })
        ),
      ],
    })),
  ],
}));

export const config = resolveConfig(rawConfig);
