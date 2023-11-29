import { defineExtension, type Extension } from "../..";

declare module "../.." {
  interface Extensions {
    yaml: () => Extension;
  }
}

export const yamlExtension = defineExtension({
  name: "yaml",
  serialize: (v: unknown) => JSON.stringify(v, null, 2),
  parse: (v: string) => JSON.parse(v),
});