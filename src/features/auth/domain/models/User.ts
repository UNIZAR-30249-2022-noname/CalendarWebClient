export type Privileges = "none" | "professor" | "coordinator";

type User = {
  name: string;
  privileges?: Privileges;
};

export default User;
