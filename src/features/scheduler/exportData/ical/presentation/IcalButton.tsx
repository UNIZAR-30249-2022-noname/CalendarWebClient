import DownloadLink from "react-download-link";
import { SaveFilled } from "@ant-design/icons";
import { IcalService } from "../domain/services/Ical.service";
import { useContext } from "react";
import { SelectedDegreeContext } from "../../../../../core/context/context";
import { notifications } from "../../../../../core/presentation/components/notifications/notifications";
import { Button } from "antd";

export const IcalButton = () => {
  const selectedDegree = useContext(SelectedDegreeContext).store;

  const handleError = async () => {
    if (!selectedDegree) return;
    const res = await IcalService.getIcal(selectedDegree);
    if (res.isError) {
      notifications.error("No se pudo descargar el calendario");
      return Promise.reject();
    }
    return res.value;
  };

  return (
    <DownloadLink
      label={
        <Button type="primary" icon={<SaveFilled />} size="small">
          Descargar iCal
        </Button>
      }
      filename={`horario_21/22_${selectedDegree.degree}_${selectedDegree.year}.ics`}
      exportFile={handleError}
    />
  );
};
