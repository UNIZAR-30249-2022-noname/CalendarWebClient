import Layout, { Content } from "antd/lib/layout/layout";
import Text from "antd/lib/typography/Text";
import { ImportForm } from "../../../features/data/presentation/components/ImportForm";

export const DataPage = () => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ImportForm />
    </div>
  );
};
