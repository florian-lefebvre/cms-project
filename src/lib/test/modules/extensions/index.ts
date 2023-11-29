import { createModule } from "../..";
import { jsonExtension } from "./json";
import { yamlExtension } from "./yaml";

export const coreExtensionsModule = createModule({
  id: "core:extensions",
  setup({ addExtension }) {
    addExtension(jsonExtension)
    addExtension(yamlExtension)
  },
});
