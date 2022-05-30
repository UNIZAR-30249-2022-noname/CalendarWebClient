import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { httpServices } from "../../../../core/backend/http/services";
import Text from "antd/lib/typography/Text";
import { UploadCSVService } from "../../domain/services/UploadCSV.service";

export const ImportForm = () => {
  const [upload, setUpload] = useState<File>();
  const [content, setContent] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [privileges, setPrivileges] = useState(localStorage.getItem("priv"));
  function onFileChange(event: any) {
    // Update the state
    setUpload(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = function (e) {
      console.log(typeof reader.result);
      console.log(reader.result);
      if (typeof reader.result === "string") {
        setContent(reader.result);
      }
      setEnabled(true);
    };
    reader.readAsText(event.target.files[0]);
  }

  const styleEnable = () => {
    if (!enabled) {
      return {};
    } else {
      return { backgroundColor: "blue", color: "white" };
    }
  };

  const sendCSV = async () => {
    const key = "update";
    message.loading({ content: "Actualizando datos...", key: key });
    if (privileges) {
      const reserves = await UploadCSVService.uploadCSV(content, privileges);
      if (reserves.isError) message.error("Error al importar csv");
      else {
        message.success({
          content:
            "El archivo: " + upload?.name + " se ha importado correctamente.",
          duration: 1,
          key: key,
        });
      }
    } else {
      message.error({ content: "Error de privilegios", key: key });
    }
  };

  function welcome(privileges: any) {
    if (privileges != null) {
      if (privileges === "janitor") return <h1>Subir CSV de aulas</h1>;
      else if (privileges === "coordinator") return <h1>Subir listado 207</h1>;
      else return <h1>No tiene permisos para subir csv</h1>;
    } else return <h1></h1>;
  }

  return (
    <div>
      {welcome(privileges)}
      <input type="file" accept=".csv" onChange={onFileChange} />
      <button disabled={!enabled} style={styleEnable()} onClick={sendCSV}>
        {!upload?.name || "Subir "}
        {upload?.name || "Ningún archivo seleccionado"}
      </button>
    </div>
  );
};
