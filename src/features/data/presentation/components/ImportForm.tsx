import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { httpServices } from "../../../../core/backend/http/services";
import Text from "antd/lib/typography/Text";

export const ImportForm = () => {
  const [upload, setUpload] = useState<File>();
  const [content, setContent] = useState("");
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
    };
    reader.readAsText(event.target.files[0]);
  }
  return (
    <div>
      <input type="file" accept=".csv" onChange={onFileChange} />
      <button>Upload!</button>
      <Text>{upload?.name}</Text>
      <Text>{content}</Text>
    </div>
  );
};
