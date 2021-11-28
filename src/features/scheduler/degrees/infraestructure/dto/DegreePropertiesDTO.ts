

type DegreePropertiesDTO = {
  name: string;
  years:  YearPropertiesDTO[];
};

type YearPropertiesDTO = {
    groups:string[];
    name: Number;

}


export default DegreePropertiesDTO;
export type {YearPropertiesDTO};