type DegreeProperties = {
  list: String[];
  properties: Map<string, YearProperties[]>;
};
type YearProperties = {
  groups: string[];
  name: Number;
};
export default DegreeProperties;
export type { YearProperties };
