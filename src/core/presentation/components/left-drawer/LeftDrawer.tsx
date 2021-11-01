import { Button } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import { useState } from "react";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";

export const LeftDrawer = () => {
  return (
    <>
      <SidebarHeader
        style={{
          backgroundColor: "#E6E7EA",
          padding: 10,
        }}
      >
        <Title level={4} style={{ display: "flex", flexWrap: "wrap" }}>
          Ingeniería informática
        </Title>
      </SidebarHeader>
      <SidebarContent style={{ backgroundColor: "#E6E7EA", padding: 10 }}>
        <Button
          style={{
            backgroundColor: "red",
            color: "white",
          }}
        >
          Verificación y validaciasfsdfdsafsdfsdafsadfsaón
        </Button>
      </SidebarContent>
      <SidebarFooter style={{ backgroundColor: "#E6E7EA", padding: 10 }}>
        OWO
      </SidebarFooter>
    </>
  );
};
