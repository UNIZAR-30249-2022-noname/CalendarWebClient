import User from "../models/User";
const noUser: User = {
  name :"",
  privileges : "none",
};

 var currentUser: User = noUser;

export const session = {
  // TODO: just mocked the user session, you have to do it by yourself
/*
  logout:()=>{
    console.log("logut")
    console.log(currentUser)
  },

  login:(usr:User)=>{
    currentUser = usr;
    console.log("login")
    console.log(currentUser)
  }*/
};
