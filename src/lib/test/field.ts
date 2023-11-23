export type BaseFieldParams<
  TName extends string,
  TOpts extends Record<string, any>
> = {
  name: TName;
  label: string;
} & TOpts;

export const stringField = <
  TName extends string,
  Params extends BaseFieldParams<TName, {}>
>(
  params: Params
) => params;

export type Fields = {
  string: typeof stringField;
};

export type DefineFieldParams = {
  fields: Fields;
};
export type DefineFieldReturn<TName extends string> = BaseFieldParams<
  TName,
  {}
>;

export const defineField = <
  TName extends string,
>(
  fn: (params: DefineFieldParams) => DefineFieldReturn<TName>
) => fn;
