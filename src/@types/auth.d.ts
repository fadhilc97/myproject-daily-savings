export interface IUser {
  id: number;
  fullName: string;
  email: string;
  password: string;
}

interface IRegister extends IUser {
  password2: string;
}
