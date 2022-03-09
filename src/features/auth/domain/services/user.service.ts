import { UserRepo } from "../../infraestructure/repositories/User.repositories";
import User from "../models/User";



export const userService = {

  getCredentials:async (usr:String)=>{
   return await UserRepo.getCredentials(usr)
  }
};
