export interface TemplateBaseApiModel {
  id: number;
  name: string;
  description: string;
}

export interface TemplateApiModel extends TemplateBaseApiModel {
  params: [];
}

export interface TemplateBaseModel {
  id: number;
  name: string;
  description: string;
}

export interface TemplateBlockParam {
  blockParamIsOptional: boolean;
  blockParamKey: string;
  blockParamTranslationKey: string;
  blockParamType: string;
  filledBy: string;
}

export interface TemplateBlockModel {
  blockId: number;
  templateBlockName: string;
  params: TemplateBlockParam[];
}

export interface TemplateModel extends TemplateBaseModel {
  templateBlocks: TemplateBlockModel[];
}
