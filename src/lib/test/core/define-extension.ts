import type { Extension } from "../types";

export const defineExtension = <TName extends string>(extension: Extension<TName>) => extension