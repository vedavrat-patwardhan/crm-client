import { LoginModel } from "./PagesModel";

export interface StoreModel {
  update: boolean;
  token: string;
  auth: string;
}

export interface StoreDispatchModel {
  thunkLogin?: (
    data: LoginModel,
    setErrors: React.Dispatch<
      React.SetStateAction<{
        email: string;
        password: string;
      }>
    >,
    onLogin: () => void
  ) => (dispatch: any) => void;
  thunkLogout?: () => (dispatch: any) => void;
  setUpdate?: () => { type: string };
}
