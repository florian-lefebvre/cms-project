export type ExtensionAdapter = {
  name: string;
  serialize: (v: unknown) => string;
  parse: (v: string) => unknown;
};

export type ExtensionsAdapters = {
  json: () => ExtensionAdapter;
};

export const jsonExtensionAdapter: ExtensionAdapter = {
  name: "json",
  serialize: (v) => JSON.stringify(v, null, 2),
  parse: (v) => JSON.parse(v),
};
