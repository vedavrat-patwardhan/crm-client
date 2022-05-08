import React from "react";
import { RestartAlt } from "@mui/icons-material";
import { Controls } from "./Controls/Controls";
import { TableSortingModel } from "../Models/ComponentsModel";

export const TableSorting: React.FC<TableSortingModel> = (props) => {
  const {
    search,
    searchPlaceHolder,
    handleSearch,
    filterPlaceholder,
    handleFilter,
    setReset,
    itemsPlaceholder,
    handleItems,
    handleApply,
  } = props;

  return (
    <div className="table__filter">
      <Controls.SearchableInput
        placeholder={searchPlaceHolder}
        handleInput={handleSearch}
        value={search}
        className="wd-50p"
      />
      <Controls.DropDown
        placeholder={filterPlaceholder}
        options={["Last 7 Days", "Last 30 Days"]}
        handleInput={handleFilter}
      />
      <button className="form-btn m-l-8" onClick={handleApply}>
        Apply
      </button>
      <RestartAlt
        className="m-l-8 m-r-8 ft-sz-32 color-primary cursor-pointer "
        onClick={setReset}
      />
      <strong className="m-r-8">Rows per page : </strong>
      <Controls.DropDown
        placeholder={itemsPlaceholder}
        options={["5", "10", "25", "50"]}
        handleInput={handleItems}
        btnClass="wd-3-75r"
        dropClsss="wd-3-5r"
      />
    </div>
  );
};
