import { FC, useState } from "react";
import User from "../../features/auth/domain/models/User";
import {  UserContext } from "./context";
export const DefaultUser: User = {name:"", privileges:"none"}

export const UserContextWrapper: FC = ({ children }) => {
  const [usr, setUsr] = useState<User>(DefaultUser);
  const actions = {
    login: (newUsr: User) => {
      console.log(usr)
      setUsr(newUsr);
      console.log("login")
      console.log(usr)
    },
    logout: () => {
      console.log(usr)
      setUsr(DefaultUser);
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
