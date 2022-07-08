export interface IUser {
  email?: string;
  isLoggedIn: boolean;
  _id?: string;
}

export interface SignupUser {
  email: string;
  name: string;
  password: string;
}
