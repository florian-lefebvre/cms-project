import type { FieldReturn, Fields } from "../types";

export const defineField = <
  TData extends Record<string, any>,
  TFn extends (params: { widgets: {} }) => {
    metadata: { type: string; widget: any };
  }
>(
  fn: (params: { fields: Fields }) => ReturnType<FieldReturn<TData, TFn>>
) => fn;
