import React, { BaseSyntheticEvent, useState } from "react";
import { Controls } from "../Components/Controls/Controls";
import { useForm } from "../Components/UseForm";
import { authService } from "../Service/Service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HamBurger from "../Components/HamBurger";

const Profile: React.FC = () => {
  const notify = () => toast("Password updated successfully!");
  const initialVal = {
    currentPass: "",
    newPass: "",
    confirmNewPass: "",
  };
  const { values, setValues, handleInput } = useForm(initialVal);
  const [errors, setErrors] = useState<{
    currentPass: string;
    confirmNewPass: string;
  }>({
    currentPass: "",
    confirmNewPass: "",
  });
  const resetValues = () => {
    setValues(initialVal);
    notify();
  };
  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (values.confirmNewPass !== values.newPass) {
      setErrors({ ...errors, confirmNewPass: "Password isn't matching" });
      return;
    }
    authService.changePass(
      {
        currentPass: values.currentPass,
        newPass: values.newPass,
      },
      setErrors,
      resetValues
    );
  };
  return (
    <>
      <HamBurger />
      <div className="profile-page">
        <h1>You can change your password</h1>
        <form className="profile-page__card" onSubmit={handleSubmit}>
          <Controls.PasswordInput
            className="wd-100p"
            placeholder="Current Password"
            name="currentPass"
            value={values.currentPass}
            handleInput={handleInput}
            error={errors.currentPass}
          />
          <Controls.PasswordInput
            className="wd-100p m-b-16 m-t-16"
            placeholder="New password"
            name="newPass"
            value={values.newPass}
            handleInput={handleInput}
          />
          <Controls.PasswordInput
            className="wd-100p"
            placeholder="Confirm new password"
            name="confirmNewPass"
            value={values.confirmNewPass}
            handleInput={handleInput}
            error={errors.confirmNewPass}
          />
          <button className="form-btn m-t-16" type="submit">
            Change Password
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Profile;
