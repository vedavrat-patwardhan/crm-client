import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { InputsModel } from "../../Models/ComponentsModel";

export const PasswordInput: React.FC<InputsModel> = (props) => {
  let { placeholder, name, value, className, handleInput, error } = props;
  const [show, setShow] = useState(false);
  if (!error) {
    error = "";
  }

  return (
    <div className="dfc">
      <div
        className={`form-control ${className ? className : ""}`}
        style={{ borderColor: error === "" ? "" : "#fc5a5a" }}
      >
        <input
          autoComplete="new-password"
          className={`password-input `}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleInput}
        />

        {show ? (
          <Visibility
            fontSize="small"
            onClick={() => setShow(false)}
            className="cursor-pointer on-hover-black"
          />
        ) : (
          <VisibilityOff
            fontSize="small"
            onClick={() => setShow(true)}
            className="cursor-pointer on-hover-black"
          />
        )}
      </div>
      {error !== "" && <p className="error-field">{error}</p>}
    </div>
  );
};
