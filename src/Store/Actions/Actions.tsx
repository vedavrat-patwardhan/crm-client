import axios from "axios";
import { LoginModel } from "../../Models/PagesModel";

export const SET_UPDATE = "SET_UPDATE";
export const SET_TOKEN = "SET_TOKEN";
export const SET_AUTH = "SET_AUTH";

export const setUpdate = () => {
  return {
    type: SET_UPDATE,
  };
};

export const setToken = (value: string) => {
  return {
    type: SET_TOKEN,
    value,
  };
};

export const setAuth = (value: string) => {
  return {
    type: SET_AUTH,
    value,
  };
};

export const login = (
  data: LoginModel,
  setErrors: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >,
  onLogin: () => void
) => {
  return (dispatch: any) => {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/login`, data)
      .then((res) => {
        dispatch(setToken(res.data.token));
        dispatch(setAuth(res.data.auth));
        onLogin();
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
  };
};

export const logout = () => {
  return (dispatch: any) => {
    dispatch(setToken(""));
    dispatch(setAuth(""));
  };
};
