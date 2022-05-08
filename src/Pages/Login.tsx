import React, { BaseSyntheticEvent, useState } from "react";
import { Controls } from "../Components/Controls/Controls";
import { useForm } from "../Components/UseForm";
import { GoBack } from "../Components/GoBack";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../Store/Actions/Actions";
import { LoginModel } from "../Models/PagesModel";
import { StoreDispatchModel } from "../Models/StoreModel";

const Login: React.FC<StoreDispatchModel> = ({ setUpdate, thunkLogin }) => {
  const navigate = useNavigate();
  const initialVal = {
    email: "",
    password: "",
  };

  const [errors, setErrors] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const { values, handleInput, validateEmail } = useForm(initialVal);

  const validate = () => {
    const temp = { ...initialVal };
    temp.email = validateEmail(values.email)
      ? ""
      : "Please enter valid mail id";
    temp.password = values.password ? "" : "This field is required!";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const onLogin = () => {
    setUpdate!();
    navigate("/dashboard");
  };
  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (validate()) {
      thunkLogin!(values, setErrors, onLogin);
    }
  };
  return (
    <div className="register-page">
      <GoBack />
      <div className="register-page__heading">Login</div>
      <div className="register-page__sub-heading">
        Enter your credentials to log into Logic CRM !
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="login-input wd-100p">
          <Controls.NormalInput
            className="wd-100p"
            placeholder="Email"
            type="email"
            name="email"
            value={values.email}
            handleInput={handleInput}
            error={errors.email}
          />
          <Controls.PasswordInput
            className="m-t-16"
            placeholder="Password"
            name="password"
            value={values.password}
            handleInput={handleInput}
            error={errors.password}
          />
        </div>
        <button className="btn form-btn wd-50p m-t-16">Login</button>
      </form>
    </div>
  );
};

const mapStateToProps = (_state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    thunkLogin: (
      data: LoginModel,
      setErrors: React.Dispatch<
        React.SetStateAction<{ email: string; password: string }>
      >,
      onLogin: () => void
    ) => dispatch(actionCreators.login(data, setErrors, onLogin)),
    setUpdate: () => dispatch(actionCreators.setUpdate()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
