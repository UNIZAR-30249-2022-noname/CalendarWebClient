type DegreesProperties = {
  list: String[];
  properties: Map<string, YearProperties[]>;
  
};
type YearProperties = {
    groups:string[];
    name: Number;
    
  };
export default DegreesProperties;
export type {YearProperties}
