import DownloadLink from "react-download-link";
import { FrownOutlined  } from "@ant-design/icons";

export const IcalButton = () => {
   
        
    
    return (
        <DownloadLink  label={<FrownOutlined style={{ fontSize: 50, color: "#37902F" }}/>} filename="sapo.txt" exportFile={fetchFile}/>
    )
}

function fetchFile() {
    return "Mira k eres sapo"
    
}
