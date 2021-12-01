import { ProfileOutlined } from "@ant-design/icons";
import { FC } from "react";

type Props = {
  openNotesDrawer: Function;
};

export const RightSidebar: FC<Props> = ({ openNotesDrawer }) => {
  return (
    <div
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#D6D6D6",
        height: "100%",
        borderLeft: "2px solid #1890FF",
      }}
    >
      <div style={{ display: "grid" }}>
        <ProfileOutlined
          onClick={() => openNotesDrawer()}
          style={{ fontSize: 30, color: "purple", padding: 5 }}
        />
      </div>
    </div>
  );
};
