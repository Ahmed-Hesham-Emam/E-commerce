//define the interface for the register data
export interface RegisterData extends LoginData {
  name: string;
  rePassword: string;
  phone: string;
}

//define the interface for the login data
export interface LoginData {
  email: string;
  password: string;
}

//define the interface for the success and fail response
export interface fail {
  statusMsg: string;
  message: string;
  user: User;
  token: string;
}

export interface success {
  message: string;
  user: User;
  token: string;
}

//define the interface for the user
export interface User {
  name: string;
  email: string;
  role: string;
}

export interface Decode {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}
