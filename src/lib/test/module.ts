import type { ExtensionAdapter } from "./extension-adapters";

type SetupParams = {
  addExtension(extension: ExtensionAdapter): void;
  addField(field: any): void;
  addWidget(widget: any): void;
};

export type DefineModuleParams = {
  id: string;
  setup(params: SetupParams): void | Promise<void>;
};

export const defineModule = (params: DefineModuleParams) => params;
