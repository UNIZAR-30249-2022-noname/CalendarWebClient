import { Button } from "antd";
import React from "react";

const DownloadReportButton = ()=>{
    return (
        <div style={{"paddingRight":"30px","paddingBottom":"5px" }}>
         <Button >Download report</Button>
         </div>
    )
}


export default React.memo(DownloadReportButton);