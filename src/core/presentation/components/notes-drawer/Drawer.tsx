import { Drawer } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import { DrawerContext } from "../../../context/context";

export const NotesDrawer: FC = ({ children }) => {
  const { visibleDrawer, setVisibleDrawer } = useContext(DrawerContext);
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    setvisible(visibleDrawer);
  }, [visibleDrawer]);

  const onClose = () => {
    setVisibleDrawer(false);
  };

  return (
    <>
      <Drawer title="Basic drawer" visible={visible} onClose={onClose}>
        {/*TODO: hacer el componente de notas en features para anyadirlo*/}
        {children}
      </Drawer>
    </>
  );
};
