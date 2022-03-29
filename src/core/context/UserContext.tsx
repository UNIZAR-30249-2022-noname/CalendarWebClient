import { FC, useState } from "react";
import User, { Privileges } from "../../features/auth/domain/models/User";
import {  UserContext } from "./context";
export const DefaultUser: User = {name:"", privileges:"none"}

export const UserContextWrapper: FC = ({ children }) => {


  const initUsr=():User=>{
    if(localStorage.getItem("name")===null)
      return DefaultUser
    
    return {
      name:localStorage.getItem("name")!,
      privileges:localStorage.getItem("priv")! as Privileges,
    }
  }
  const [usr, setUsr] = useState<User>(initUsr());
  const actions = {
    login: (newUsr: User) => {

      
      
      setUsr(newUsr);
      localStorage.setItem("name",newUsr.name)
      localStorage.setItem("priv",newUsr.privileges!)
      console.log("login")
      console.log(newUsr)
    
    },
    logout: () => {
      console.log(usr)
      setUsr(DefaultUser);
      localStorage.setItem("name",DefaultUser.name)
      localStorage.setItem("priv",DefaultUser.privileges!)
      console.log("logout")
      console.log(usr)
     
    },
  };

  return (
    <UserContext.Provider value={{ usr, actions }}>
      {children}
    </UserContext.Provider>
  );
};
