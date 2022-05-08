import React from "react";
import { InputsModel } from "../../Models/ComponentsModel";

export const NormalInput: React.FC<InputsModel> = (props) => {
  let {
    placeholder,
    type = "text",
    className,
    name,
    value,
    handleInput,
    error,
  } = props;
  if (!error) {
    error = "";
  }
  return (
    <div className={className}>
      <input
        autoComplete="new-password"
        className={`form-control ${error === "" ? "" : "error-border"}`}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleInput}
      />
      {error !== "" && <p className="error-field">{error}</p>}
    </div>
  );
};
