import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { httpServices } from "../../../../core/backend/http/services";

const { Dragger } = Upload;

export const ImportForm = () => {
  return (
    <div style={{ width: "300px", height: "300px" }}>
      <Dragger {...props} style={{ width: "300px", height: "300px" }}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Clica o arrastra hasta aquí el fichero a subir
        </p>
        <p className="ant-upload-hint">Sólo soporta ficheros en formato csv</p>
      </Dragger>
    </div>
  );
};

const props = {
  accept: "text/csv",
  name: "file",
  multiple: false,
  action: httpServices.uploadData,
  onChange(info: { file: { name?: any; status?: any }; fileList: any }) {
    const { status } = info.file;
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
