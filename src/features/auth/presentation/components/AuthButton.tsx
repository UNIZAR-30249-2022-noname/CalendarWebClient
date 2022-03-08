import { Button } from "antd";


type Props = {
  logged: boolean
}

export const AuthButton = ({logged}: Props) => {
  if (logged)
    return (
      <Button type="primary" danger size="large" style={{ fontSize: 20 }}>
        Salir
      </Button>
    );

    return (
      <Button type="primary"  size="large" style={{ fontSize: 20 }}>
        Login
      </Button>
    );
};
