export interface email {
  email: string;
}

//define the interface for the register data
export interface RegisterData extends LoginData, email {
  name: string;
  rePassword: string;
  phone: string;
}

//define the interface for the login data
export interface LoginData extends email {
  password: string;
}

export interface responseData {
  statusMsg: string;
  message: string;
}

export interface Code {
  resetCode: string;
}

//define the interface for the success and fail response
export interface fail extends responseData, success {
  // this has became redundant now after extending the success and response Data interfaces
}

export interface success extends responseData {
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
