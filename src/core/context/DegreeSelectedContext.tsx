import { FC, useState } from "react";
import { degreePropertiesService } from "../../features/scheduler/degrees/domain/services/DegreeProperties.service";
import AvailableHoursParamsDTO from "../../features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";
import { SelectedDegreeContext } from "./context";

export const SelectedDegreeContextWrapper: FC = ({ children }) => {
  const [store, setStore] = useState<AvailableHoursParamsDTO>(
    degreePropertiesService.getSelectedDegree()
  );
  const actions = {
    setSelectedDegree: (degreeProps: AvailableHoursParamsDTO) => {
      setStore(degreeProps);
      degreePropertiesService.setSelectedDegree(degreeProps);
    },
  };

  return (
    <SelectedDegreeContext.Provider value={{ store, actions }}>
      {children}
    </SelectedDegreeContext.Provider>
  );
};
