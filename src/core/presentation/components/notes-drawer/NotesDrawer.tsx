import { Drawer } from "antd";
import { FC } from "react";

type Props = {
  closeNotesDrawer: Function;
  visible: boolean;
};

export const NotesDrawer: FC<Props> = ({
  children,
  closeNotesDrawer,
  visible,
}) => {
  return (
    <>
      <Drawer
        title="Basic drawer"
        visible={visible}
        onClose={() => closeNotesDrawer()}
      >
        {/*TODO: hacer el componente de notas en features para anyadirlo*/}
        {children}
      </Drawer>
    </>
  );
};
