import { FC, useState } from "react";
import { SubjectAvailableHours } from "../../features/scheduler/degrees/domain/models/SubjectAvailableHours";
import Entry, { SubjectKind, substractTime, Time } from "../../features/scheduler/entries/domain/models/Entry";
import { DegreeSubjectsContext } from "./context";

export const DegreeSubjectsContextWrapper: FC = ({ children }) => {
  const [store, setStore] = useState<SubjectAvailableHours[] | undefined>();
  const actions = {
    setDegreeSubjects: (subject: SubjectAvailableHours[]) => setStore(subject),
    updateSubject:(subject: string, time: Time, kind: SubjectKind)=>{

      const i = store?.findIndex(s=>s.subject===subject)
      console.log(i);
      var newStore= store

      //en vez de uno hay que restar {time}, 
      //newStore![i!].theory.remaining es de tipo number, no Time por lo que 
      // es imposible hacerlo correctamente
      switch (kind) {
        case SubjectKind.theory:
          newStore![i!].theory.remaining-=1 
          break;
        case SubjectKind.practices:
          newStore![i!].practice.remaining-=1 
          break;
          
        default:
          //problems
          newStore![i!].exercises.remaining-=1 
          break;
      }
      setStore(newStore)
      
    }
  };

  return (
    <DegreeSubjectsContext.Provider value={{ store, actions }}>
      {children}
    </DegreeSubjectsContext.Provider>
  );
};
