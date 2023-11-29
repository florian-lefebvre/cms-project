import type { Collection, CollectionReturn } from "../types";

export const defineCollection = <TReturn extends CollectionReturn>(collection: Collection<TReturn>) => collection;
