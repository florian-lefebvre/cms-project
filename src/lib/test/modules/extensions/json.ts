import { defineExtension, type Extension } from "../..";

declare module "../.." {
  interface Extensions {
    json: () => Extension;
  }
}

export const jsonExtension = defineExtension({
  name: "json",
  serialize: (v: unknown) => JSON.stringify(v, null, 2),
  parse: (v: string) => JSON.parse(v),
});