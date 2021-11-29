type DegreePropertiesDTO = {
  name: string;
  years: YearPropertiesDTO[];
};

type YearPropertiesDTO = {
  groups: string[];
  name: number;
};

export default DegreePropertiesDTO;
export type { YearPropertiesDTO };
