import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { session } from "../../domain/services/session.service";


type Props = {
  logged: boolean
}

export const AuthButton = ({logged}: Props) => {
  const history = useHistory();
  
  const routeChange = () =>{ 
    let path = `/login`; 
    history.push(path);
  }

  if (logged){
    
    return (
      <Button 
      type="primary" 
      danger size="large" 
      style={{ fontSize: 20 }}
      onClick={session.logout}
      >
        Salir
      </Button>
    );
  }

  return (
    <Button 
    type="primary" 
    size= "large"
    style={{ fontSize: 20 }}
    onClick={routeChange}
    >
      Login
    </Button>
  );
};
