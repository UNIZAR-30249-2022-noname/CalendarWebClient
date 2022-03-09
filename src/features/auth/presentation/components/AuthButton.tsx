import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../../core/context/context";
import { session } from "../../domain/services/user.service";


type Props = {
  logged: boolean
}

export const AuthButton = () => {
  const contextUser = useContext(UserContext);
  const [hover,setHover] = useState(false)

  const history = useHistory();
  
  const routeChange = () =>{ 
    let path = `/login`; 
    history.push(path);
  }

  const logout = ()=>{
    contextUser.actions.logout()
  }

  const loggedButton=()=>{

    if (hover){
      return(
      <Button 
      
        type="primary" 
        danger size="large" 
        style={{ fontSize: 20 }}
        onClick={logout}
        >
          Salir
        </Button>)

    }
    return (
    <Button 
      
      type="primary" 
      size="large" 
      style={{ fontSize: 20 }}
     
      >
        {contextUser.usr.name} 
      </Button>)
  }

  if (contextUser.usr.name!=""){
    
    return (

      <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() =>  setHover(false)}>
      {loggedButton()}
    
     
      </div>
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

