import { BaseSyntheticEvent, useState } from "react";
import validator from "validator";

export const useForm = (initialState: any) => {
  const [values, setValues] = useState(initialState);

  const handleInput = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validateEmail = (mail: string) => {
    return validator.isEmail(mail);
  };
  const validateMobile = (mobileNo: string) => {
    return validator.isMobilePhone(mobileNo, "en-IN");
  };

  return {
    values,
    setValues,
    handleInput,
    validateEmail,
    validateMobile,
  };
};
