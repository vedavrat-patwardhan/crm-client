import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Option } from "react-bootstrap-typeahead/types/types";
import { SearchBoxModel } from "../../Models/ComponentsModel";

export const SearchBox: React.FC<SearchBoxModel> = (props) => {
  const { options, onChange, placeholder, className, iniVal } = props;
  const [select, setSelect] = useState<any[]>([]);
  useEffect(() => {
    if (iniVal === "clear" || !iniVal) {
      setSelect([]);
      return;
    }
    if (iniVal) {
      setSelect([iniVal]);
    }
  }, [iniVal]);
  return (
    <Typeahead
      inputProps={{ autoComplete: "new-password" }}
      flip
      id={"#" + placeholder}
      clearButton
      labelKey="name"
      className={className}
      placeholder={placeholder}
      onChange={(selected: { name: string }[] | Option[]) => {
        setSelect(selected);
        onChange(selected);
      }}
      onInputChange={(selected: string) => onChange(selected)}
      options={options}
      selected={select}
    />
  );
};
