import type { FieldReturn } from "../types";

export const resolveField = <
  TData extends Record<string, any>,
  TFn extends (params: { widgets: {} }) => {
    metadata: { type: string; widget: any };
  }
>(
  field: ReturnType<FieldReturn<TData, TFn>>,
  params: Parameters<TFn>[0]
) => {
  const { fn, data } = field;
  const { metadata } = fn(params);
  return { metadata, data };
};
