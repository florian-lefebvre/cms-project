import type {
  ExtensionAdapter,
  ExtensionsAdapters,
} from "./extension-adapters";
import type { defineField } from "./field";

export type DefineCollectionParams = {
  extensions: ExtensionsAdapters;
};
export type DefineCollectionReturn<
  TFields extends Array<ReturnType<typeof defineField>> = Array<
    ReturnType<typeof defineField>
  >
> = {
  name: string;
  label: string;
  path: string;
  extension: ExtensionAdapter;
  fields: TFields;
  // TODO: type
  slug: (params: Record<string, any>) => string;
};

export const defineCollection = <TReturn extends DefineCollectionReturn>(
  fn: (params: DefineCollectionParams) => TReturn
) => fn;
