import { FC, useState } from "react";
import { SubjectAvailableHours } from "../../features/scheduler/degrees/domain/models/SubjectAvailableHours";
import { DegreeSubjectsContext } from "./context";

export const DegreeSubjectsContextWrapper: FC = ({ children }) => {
  const [store, setStore] = useState<SubjectAvailableHours[] | undefined>();
  const actions = {
    setDegreeSubjects: (subject: SubjectAvailableHours[]) => setStore(subject),
  };

  return (
    <DegreeSubjectsContext.Provider value={{ store, actions }}>
      {children}
    </DegreeSubjectsContext.Provider>
  );
};
