import React from "react";
import { Search } from "@mui/icons-material";
import { SearchableInputModel } from "../../Models/ComponentsModel";

export const SearchableInput: React.FC<SearchableInputModel> = (props) => {
  const { placeholder, handleInput, value, name = "search", className } = props;
  return (
    <div className={`search-div ${className}`}>
      <input
        autoComplete="off"
        type="text"
        className="search__input"
        placeholder={placeholder}
        onChange={handleInput}
        value={value}
        name={name}
      />
      <Search className="search__icon" />
    </div>
  );
};
