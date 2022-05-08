import React, { BaseSyntheticEvent, useState } from "react";
import "../Styles/App.css";
import { Controls } from "../Components/Controls/Controls";
import { useForm } from "../Components/UseForm";
import { GoBack } from "../Components/GoBack";
import { authService } from "../Service/Service";

const Register: React.FC = () => {
  const initialVal = {
    name: "",
    mobileNo: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
    adminMail: "",
    adminPassword: "",
  };
  const [errors, setErrors] = useState<{
    email: string;
    password: string;
    mobileNo: string;
    confirmPassword: string;
  }>({ email: "", password: "", mobileNo: "", confirmPassword: "" });
  const { values, setValues, handleInput, validateEmail, validateMobile } =
    useForm(initialVal);
  const validate = () => {
    const temp = { ...initialVal };
    temp.email = validateEmail(values.email)
      ? ""
      : "Please enter valid mail id";
    temp.password = values.password ? "" : "This field is required!";
    temp.mobileNo = validateMobile(values.mobileNo)
      ? ""
      : "Please enter valid mobile no";
    temp.confirmPassword =
      values.password === values.confirmPassword
        ? ""
        : "Password doesn't match";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const resetForm = () => {
    setValues(initialVal);
  };
  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (validate()) {
      authService.userRegistration(values, resetForm);
    }
  };
  return (
    <div className="register-page">
      <GoBack />
      <div className="register-page__heading">Register</div>
      <div className="register-page__sub-heading">
        To add new member in Logic family !!!
      </div>
      <form className="register-form wd-30r" onSubmit={handleSubmit}>
        <div className="register-input">
          <Controls.NormalInput
            placeholder="Name"
            type="text"
            name="name"
            value={values.name}
            handleInput={handleInput}
          />
          <Controls.NormalInput
            placeholder="Phone Number"
            type="number"
            name="mobileNo"
            value={values.mobileNo}
            handleInput={handleInput}
          />
          <Controls.NormalInput
            placeholder="Email"
            type="email"
            name="email"
            value={values.email}
            handleInput={handleInput}
            error={errors.email}
          />
          <Controls.NormalInput
            placeholder="Date of birth"
            type="date"
            name="dob"
            value={values.dob}
            handleInput={handleInput}
          />
          <Controls.PasswordInput
            placeholder="Password"
            type="password"
            name="password"
            value={values.password}
            handleInput={handleInput}
            error={errors.password}
          />
          <Controls.PasswordInput
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            handleInput={handleInput}
            error={errors.confirmPassword}
          />
          <Controls.NormalInput
            placeholder="Admin Email"
            type="email"
            name="adminMail"
            value={values.adminMail}
            handleInput={handleInput}
          />
          <Controls.PasswordInput
            placeholder="Password"
            type="password"
            name="adminPassword"
            value={values.adminPassword}
            handleInput={handleInput}
          />
        </div>
        <button
          className={`form-btn m-t-16 wd-30p ${
            Object.values(values).every((x) => x !== "") ? "" : "btn--disabled"
          }`}
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
