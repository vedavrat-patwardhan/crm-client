import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { userService } from "../../Service/Service";
import { Controls } from "../Controls/Controls";
import { useForm } from "../UseForm";

export const UserForm: React.FC<{
  editData: any;
  update: () => void;
  addCloseFunc: React.Dispatch<React.SetStateAction<() => () => void>>;
}> = ({ editData, update, addCloseFunc }) => {
  const initialVal = {
    name: "",
    email: "",
    mobileNo: "",
    dob: "",
    password: "",
    auth: "",
  };
  const [editing, setEditing] = useState<boolean>(false);
  const { values, setValues, handleInput } = useForm(initialVal);
  const closeForm = () => {
    update();
    setEditing(false);
    setValues(initialVal);
  };
  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (editing) {
      userService.updateUser(
        editData._id,
        { ...values, dob: values.dob.toDateString() },
        closeForm
      );
    } else {
      userService.addUser(
        { ...values, dob: values.dob.toDateString() },
        closeForm
      );
    }
  };
  useEffect(() => {
    addCloseFunc(() => closeForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addCloseFunc]);
  useEffect(() => {
    if (editData._id) {
      setEditing(true);
      setValues({ ...editData, dob: new Date(editData.dob.toString()) });
    } else {
      setEditing(false);
      setValues(initialVal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);
  return (
    <div className="dashboard-form min-wd-75r p-a-24 ">
      <div className="dashboard-form__col-1">
        <strong>User Name :</strong>
        <Controls.NormalInput
          placeholder="User Name"
          handleInput={handleInput}
          name="name"
          value={values.name}
          className="m-b-16"
        />
        <strong>Details :</strong>
        <Controls.NormalInput
          placeholder="Email"
          type="email"
          handleInput={handleInput}
          name="email"
          value={values.email}
          className="m-b-16"
        />
        <Controls.PasswordInput
          placeholder="Password"
          handleInput={handleInput}
          name="password"
          value={values.password}
          className="m-b-16"
        />
      </div>
      <div className="dashboard-form__col-2">
        <strong>Date of Birth :</strong>
        <Controls.DateInput
          handleChange={(date: Date) => setValues({ ...values, dob: date })}
          value={values.dob}
        />
        <strong>Mobile Number :</strong>
        <Controls.NormalInput
          placeholder="Mobile Number"
          handleInput={handleInput}
          name="mobileNo"
          value={values.mobileNo}
          className="m-b-16"
        />
        <Controls.DropDown
          placeholder={values.auth ? values.auth : "Auth"}
          options={["user", "admin"]}
          handleInput={(option: string) => {
            setValues({ ...values, auth: option });
          }}
        />
        <button className="btn btn-primary m-t-16" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
