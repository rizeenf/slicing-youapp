import { UserData } from "./UserData";

export type TSession = {
  accessToken?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  message?: string | null | undefined;
  data: UserData;
};
