import { ProfileOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { DrawerContext } from "../../context/context";

export const RightSidebar = () => {
  const { setVisibleDrawer } = useContext(DrawerContext);

  const toggleDrawer = () => {
    setVisibleDrawer(true);
  };

  return (
    <div
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#D6D6D6",
        height: "100vh",
        borderLeft: "2px solid #1890FF",
      }}
    >
      <div style={{ display: "grid" }}>
        <ProfileOutlined
          onClick={() => toggleDrawer()}
          style={{ fontSize: 30, color: "purple" }}
        />
      </div>
    </div>
  );
};
