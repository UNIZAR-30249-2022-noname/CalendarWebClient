import { Button, message, Tabs } from "antd";
import React, { useState } from "react";
import { IssueService } from "../../domain/service/Issues.services";
import { saveAs } from "file-saver";
const { TabPane } = Tabs;

const DownloadReportButton = () => {
  const [building, setBuilding] = useState("Ada Byron");
  const onDownload = async (values: any) => {
    console.log(values);

    const res = await IssueService.download(building);
    if (res.isError) message.error("Error al descargar");
    else {
      message.info("Descargado registro de incidencias");
    }
  };
  function callback(key: any) {
    if (key === "1") {
      setBuilding("Ada Byron");
    } else if (key === "2") {
      setBuilding("Torres Quevedo");
    } else {
      setBuilding("Betancourt");
    }
  }
  return (
    <div style={{ paddingRight: "30px", paddingBottom: "5px" }}>
      <Tabs defaultActiveKey="1" type="card" size={"small"} onChange={callback}>
        <TabPane
          tab="Descargar Ada Byron"
          key="1"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button onClick={onDownload}>Download report</Button>
        </TabPane>
        <TabPane tab="Torres Quevedo" key="2">
          <Button onClick={onDownload}>Download report</Button>
        </TabPane>
        <TabPane tab="Betancourt" key="3">
          <Button onClick={onDownload}>Download report</Button>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default React.memo(DownloadReportButton);
