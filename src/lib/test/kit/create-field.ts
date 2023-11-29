import type { Field, FieldReturn } from "../types";

export const createField =
  <
    TData extends Record<string, any>,
    TFn extends (params: { widgets: {} }) => {
      metadata: { type: string; widget: any };
    } = (params: { widgets: {} }) => {
      metadata: { type: string; widget: any };
    }
  >(
    fn: TFn
  ): FieldReturn<TData, TFn> =>
  (data: TData & { name: string; label: string }) => ({
    fn,
    data,
  });
