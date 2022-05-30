export type Privileges = "none" | "professor" | "coordinator" | "janitor" | "logged";

type User = {
  name: string;
  privileges?: Privileges;
};

export default User;
