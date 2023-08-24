
export interface SchemaAttribute {  // Attributes Schema
  key?: string;
  type?: string;
  name?: string;
  cardView?: boolean;
  gridView?: boolean;
  unique?: boolean;
  required?: boolean;
  search?: boolean;
  sort?: boolean;
}

interface SchemaFile { // Schema File Interface
  id: string;
  name: string;
  description: string;
  schema: string;
  attributes: SchemaAttribute[]; // Adjust this type based on the actual schema attributes structure
}

interface SchemaData {
  fields: {};
}
interface ConfigData {
  DefaultView: string;

}
interface LoadedData {
  defaultview: string;
  dropdownData: string[];
  bsData: Record<string, { schema: SchemaFile; data: SchemaData }>;
}
// Function used to get all the files inside a directory
export const importFiles = (dir: __WebpackModuleApi.RequireContext) => {
  var files: Record<string, any> = {};
  dir.keys().forEach((key: string) => (files[key] = dir(key)));
  return files;
};

// From all the files extract schema definition and construct object
export const loadSchemaFiles = (files: Record<string, any>): LoadedData => {
  const gData: Record<string, { schema: any; data: SchemaData }> = {};
  const dropdownValues: string[] = [];
  const defaultConfig: ConfigData = files["./Config.json"]; // default viewtype

  for (const [key, value] of Object.entries<any>(files)) {
    if (key.includes("Schema")) {
      const fileName = `./${value?.name}Data.json`;
      dropdownValues.push(value?.name);
      gData[value?.name] = {
        schema: value?.attributes,
        data: files[fileName],
      };
    }
  }

  const result: LoadedData = {
    defaultview: defaultConfig.DefaultView,
    dropdownData: dropdownValues,
    bsData: gData,
  };

  return result;
};


export function loadSchema(schemaName: string): SchemaData | undefined {
  const context = importFiles(
    require.context(`../data`, false, /.*Schema\.json$/) // Adjust the regex to match schema files
  );
  const data = context[`./${schemaName}Schema.json`]?.default;
  return data;
}