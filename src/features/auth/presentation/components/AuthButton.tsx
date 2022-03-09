import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../../core/context/context";
import { session } from "../../domain/services/session.service";


type Props = {
  logged: boolean
}

export const AuthButton = () => {
  const contextUser = useContext(UserContext);

  const history = useHistory();
  
  const routeChange = () =>{ 
    let path = `/login`; 
    history.push(path);
  }

  const logout = ()=>{
    contextUser.actions.logout()
  }


  if (contextUser.usr.name!=""){
    
    return (
      <Button 
      type="primary" 
      danger size="large" 
      style={{ fontSize: 20 }}
      onClick={logout}
      >
        {contextUser.usr.name}
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
