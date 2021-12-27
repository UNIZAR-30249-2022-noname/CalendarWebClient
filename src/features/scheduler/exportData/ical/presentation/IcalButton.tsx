import DownloadLink from "react-download-link";
import { FrownOutlined  } from "@ant-design/icons";
import { IcalService } from "../domain/services/Ical.service";

export const IcalButton = () => {
   
        
    
    return (
        <DownloadLink  label={<FrownOutlined style={{ fontSize: 50, color: "#37902F" }}/>} filename="sapo.ical" exportFile={() => IcalService.getIcal({degree:"a",year:1,group:"1"})}/>
    )
}


