import { defineCollection } from "./collection";
import { defineConfig, resolveConfig } from "./config";
import { defineField } from "./field";
import { defineModule } from "./module";

const myModule = defineModule({
  id: "my-module",
  setup({ addExtension, addField, addWidget }) {},
});

export const _config = defineConfig(({}) => ({
  modules: [myModule],
  collections: [
    defineCollection(({ extensions }) => ({
      name: "posts",
      label: "Posts",
      slug: ({ title }) => title,
      path: "content/posts",
      extension: extensions.json(),
      fields: [
        defineField(({ fields }) =>
          fields.string({ name: "title", label: "Title" })
        ),
        defineField(({ fields }) =>
          fields.string({ name: "description", label: "Description" })
        ),
      ],
    })),
  ],
}));

export const config = resolveConfig(_config);
