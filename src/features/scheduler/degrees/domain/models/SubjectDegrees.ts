type DegreeProperties = {
  list: string[];
  properties: Map<string, YearProperties[]>;
};
type YearProperties = {
  groups: string[];
  name: number;
};
export default DegreeProperties;
export type { YearProperties };
