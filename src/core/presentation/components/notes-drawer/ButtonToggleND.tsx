import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { FC } from "react";

type Props = {
  toggleDrawer: Function;
  visibility: boolean;
};

export const ButtonToggleND: FC<Props> = ({ toggleDrawer, visibility }) => {
  return (
    <>
      {visibility ? (
        <LeftCircleOutlined
          onClick={() => toggleDrawer()}
          style={{ fontSize: 30, color: "#1890FF" }}
        />
      ) : (
        <RightCircleOutlined
          onClick={() => toggleDrawer()}
          style={{ fontSize: 30, color: "#1890FF" }}
        />
      )}
    </>
  );
};
