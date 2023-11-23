import { defineCollection } from "./collection";
import { defineConfig, resolveConfig } from "./config";
import { defineField } from "./field";

export const _config = defineConfig(({}) => ({
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
