export type SignupValues = {
  name: string;
  email: string;
  phoneNumber: string;
  employeeId: string;
  password: string;
};
export interface SignedUpData {
  status: boolean;
  message: string;
}
export interface LoggedInData {
  status: boolean;
  message: string;
  data: object;
  token: string;
}
export type SignupResponse = {
  data: SignedUpData;
};
export type LoginResponse = {
  data: LoggedInData;
};
export type LoginValues = {
  employeeId: string;
  password: string;
};
