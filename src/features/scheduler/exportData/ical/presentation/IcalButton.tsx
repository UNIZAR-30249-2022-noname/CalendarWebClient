import DownloadLink from "react-download-link";
import { FrownOutlined  } from "@ant-design/icons";
import { IcalService } from "../domain/services/Ical.service";
import { useContext } from "react";
import { SelectedDegreeContext } from "../../../../../core/context/context";
import { notifications } from "../../../../../core/presentation/components/notifications/notifications";

export const IcalButton = () => {
    const selectedDegree = useContext(SelectedDegreeContext).store;

    const handleError = async ()=>{ 
      
       const res = await  IcalService.getIcal(selectedDegree)
       if(res.isError){
        notifications.error("No se pudo descargar el calendario")
         return Promise.reject()
       }
       return res.value
        
    };
    
    return (
        <DownloadLink  label={<FrownOutlined style={{ fontSize: 50, color: "#37902F" }}/>} filename="scheduler.ics" exportFile={handleError}/>
    )
}




