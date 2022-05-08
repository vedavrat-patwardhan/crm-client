import { BaseSyntheticEvent } from "react";

export interface InputsModel {
  placeholder: string;
  type?: string;
  name: string;
  value: string;
  handleInput: (e: BaseSyntheticEvent) => void;
  className?: string;
  error?: string;
}

export interface SearchableInputModel {
  placeholder: string;
  handleInput: (e: BaseSyntheticEvent) => void;
  value: string;
  name?: string;
  className?: string;
}

export interface DropDownModel {
  btnClass?: string;
  dropClsss?: string;
  placeholder: string;
  options: string[];
  handleInput: (option: string) => void;
}

export interface TableModel {
  headers: string[];
  data: JSX.Element[][];
  currentPage?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  totalData?: number;
  itemsPerPage?: number;
  pagination: boolean;
}
export interface TableSortingModel {
  search: string;
  searchPlaceHolder: string;
  handleSearch: (e: BaseSyntheticEvent) => void;
  filterPlaceholder: string;
  handleFilter: (option: string) => void;
  setReset: () => void;
  itemsPlaceholder: string;
  handleItems: (option: string) => void;
  handleApply: () => void;
}

export interface PopupModel {
  open: boolean;
  handleClose: () => void;
  data: JSX.Element;
  heading: string;
}

export interface SearchBoxModel {
  iniVal: string;
  options: any[];
  onChange: (selected: any) => void;
  placeholder: string;
  className: string;
}
