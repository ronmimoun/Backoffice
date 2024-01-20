export type FormSchemaConfigBase = {
  FORM_NAME: string;
  INPUTS: Record<string, SchemaConfig>;
};

type InputSchemaConfigBase = {
  KEY: string;
  PLACEHOLDER: string;
  DEFAULT_VALUE: string;
  LABEL: string;
  IS_REQUIRED: boolean;
};

type SchemaConfig = {
  ACCESSORS?: {
    VALUE: string;
  };
} & InputSchemaConfigBase;
