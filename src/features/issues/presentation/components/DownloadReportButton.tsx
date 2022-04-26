import { Button, message } from "antd";
import React from "react";
import { IssueService } from "../../domain/service/Issues.services";
import { saveAs } from "file-saver";

const DownloadReportButton = () => {
  const onDownload = async (values: any) => {
    console.log(values);

    const res = await IssueService.download();
    if (res.isError) message.error("Error al descargar");
    else {
      message.info("Descargado registro de incidencias");
    }
  };
  return (
    <div style={{ paddingRight: "30px", paddingBottom: "5px" }}>
      <Button onClick={onDownload}>Download report</Button>
    </div>
  );
};

export default React.memo(DownloadReportButton);
