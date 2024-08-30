export type UserData = {
  email: string;
  empid: string;
  fullname: string;
  phoneno: string;
};

export type User = {
  token: string;
  userData: UserData;
};
