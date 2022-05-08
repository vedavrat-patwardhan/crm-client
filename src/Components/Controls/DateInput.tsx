import React from "react";
import DatePicker from "react-date-picker";

export const DateInput: React.FC<{
  handleChange: (date: Date) => void;
  value: Date;
}> = ({ handleChange, value }) => {
  return (
    <DatePicker
      className="form-control date-picker"
      onChange={handleChange}
      value={value}
    />
  );
};
