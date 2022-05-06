export type Privileges = "none" | "professor" | "coordinator" | "janitor";

type User = {
  name: string;
  privileges?: Privileges;
};

export default User;
