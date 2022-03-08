import { Button } from "antd";
import { useHistory } from "react-router-dom";


type Props = {
  logged: boolean
}

export const AuthButton = ({logged}: Props) => {
  const history = useHistory();
  
  const routeChange = () =>{ 
    let path = `/login`; 
    history.push(path);
  }

  if (logged)
    return (
      <Button type="primary" danger size="large" style={{ fontSize: 20 }}>
        Salir
      </Button>
    );

    return (
      <Button 
      type="primary" 
      style={{ fontSize: 20 }}
      onClick={routeChange}
      >
        Login
      </Button>
    );
};
