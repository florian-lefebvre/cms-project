import {
  defineCollection,
  defineConfig,
  defineField,
  resolveConfig
} from "./core";
import { createField, createModule } from "./kit";

declare module "." {
  interface Fields {
    string: typeof stringField;
  }
}

const stringField = createField<{ minLength?: number }>(({ widgets }) => ({
  metadata: { type: "string", widget: null },
}));

const myModule = createModule({
  id: "my-module",
  setup({ addExtension, addField, addWidget }) {
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
