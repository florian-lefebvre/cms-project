export type CollectionReturn<
  TFields extends Array<Field<any, any>> = Array<Field<any, any>>
> = {
  name: string;
  label: string;
  path: string;
  extension: Extension;
  fields: TFields;
  slug: (params: Record<string, any>) => string;
};

export interface Extensions {}

export type Collection<TReturn extends CollectionReturn> = (params: {
  extensions: Extensions;
}) => TReturn;

export type Extension<TName extends string = string> = {
  name: TName;
  serialize: (v: unknown) => string;
  parse: (v: string) => unknown;
};

export type FieldReturn<
  TData extends Record<string, any>,
  TFn extends (params: { widgets: {} }) => {
    metadata: { type: string; widget: any };
  }
> = (data: TData & { name: string; label: string }) => {
  fn: TFn;
  data: TData & { name: string; label: string };
};

export interface Fields {}

export type Field<
  TData extends Record<string, any>,
  TFn extends (params: { widgets: {} }) => {
    metadata: { type: string; widget: any };
  } = (params: { widgets: {} }) => {
    metadata: { type: string; widget: any };
  }
> = (fn: TFn) => FieldReturn<TData, TFn>;

export type Widget = {};

export type ModuleSetupParams = {
  addExtension(extension: Extension): void;
  addField(
    field: Field<any, any>
  ): void;
  addWidget(widget: Widget): void;
};

export type Module = {
  id: string;
  setup(params: ModuleSetupParams): void;
};

export type ConfigReturn<TCollection extends Collection<any>> = {
  collections: Array<TCollection>;
  modules?: Array<Module>;
};

export type Config<
  TCollection extends Collection<any>,
  TReturn extends ConfigReturn<TCollection>
> = (params: {}) => TReturn;
