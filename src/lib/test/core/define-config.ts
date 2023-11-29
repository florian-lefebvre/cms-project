import type { Collection, Config, ConfigReturn } from "../types";

export const defineConfig = <
  TCollection extends Collection<any>,
  TReturn extends ConfigReturn<TCollection>
>(
  config: Config<TCollection, TReturn>
) => config;
