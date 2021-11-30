import { FC, useState } from "react";
import DegreeProperties, {
  YearProperties,
} from "../../features/scheduler/degrees/domain/models/SubjectDegrees";
import { DegreeInfoContext } from "./context";

export const DegreePropertiesContextWrapper: FC = ({ children }) => {
  const [store, setStore] = useState<DegreeProperties>({
    list: [],
    properties: new Map<string, YearProperties[]>(),
  });

  const actions = {
    setDegreeProperties: (degreeInfo: DegreeProperties) => setStore(degreeInfo),
  };

  return (
    <DegreeInfoContext.Provider value={{ store, actions }}>
      {children}
    </DegreeInfoContext.Provider>
  );
};
