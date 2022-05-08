import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Table } from "../Components/Table";
import { Close, Edit } from "@mui/icons-material";
import { UsersModel } from "../Models/PagesModel";
import { Popup } from "../Components/Popups/Popup";
import { TableSorting } from "../Components/TableSorting";
import { PageHeading } from "../Components/PageHeading";
import { userService } from "../Service/Service";
import { UserForm } from "../Components/Popups/UserForm";

const Users: React.FC = () => {
  const [update, setUpdate] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [notifyOpen, setNotifyOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [editData, setEditData] = useState({});
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<string>("");
  const [totalCompanies, setTotalCompanies] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [tableData, setTableData] = useState<UsersModel[]>([]);
  const [filteredTableData, setFilteredTableData] = useState<UsersModel[]>([]);
  const [closeFunc, setCloseFunc] = useState<() => () => void>(() => () => {});
  const headers = ["Name", "Contact Info", "Date of Birth", "Authority"];

  const handleSearch = (e: BaseSyntheticEvent) =>
    setSearch(e.target.value.toLowerCase());
  const handleFilter = (option: string) => setFilters(option);
  const setReset = () => {
    setFilters("");
    setSearch("");
    setFilteredTableData(tableData);
  };
  const handleItems = (option: string) => setItemsPerPage(+option);
  const updateTable = (data: UsersModel[], totalCount: number) => {
    setTableData(data);
    setFilteredTableData(data);
    setTotalCompanies(totalCount);
  };

  useEffect(() => {
    userService.getUsers(itemsPerPage, page, updateTable);
  }, [itemsPerPage, page, update]);

  const handleApply = () => {
    setFilteredTableData(
      tableData.filter((values) => {
        return (
          values.mobileNo.toString().includes(search) ||
          values.name.toLowerCase().includes(search)
        );
      })
    );
  };

  return (
    <div className="dashboard">
      <div className="dashboard__content">
        <PageHeading
          element={
            <button
              className="form-btn"
              onClick={() => {
                setOpen(true);
                setEditData({});
              }}
            >
              New User
            </button>
          }
          pageName="Customers"
        />
        <div className="content__box">
          <div className="table__filter">
            <TableSorting
              search={search}
              searchPlaceHolder="Search by Name or Mobile No"
              handleSearch={handleSearch}
              filterPlaceholder={filters ? filters : "Filter"}
              handleFilter={handleFilter}
              setReset={setReset}
              itemsPlaceholder={itemsPerPage.toString()}
              handleItems={handleItems}
              handleApply={handleApply}
            />
          </div>
          <Table
            pagination={true}
            currentPage={page}
            setPage={setPage}
            totalData={totalCompanies}
            itemsPerPage={itemsPerPage}
            headers={headers}
            data={filteredTableData.map((cell) => [
              <div className="df-ac">
                {cell.name}
                <Edit
                  fontSize="small"
                  className="cursor-pointer color-primary m-l-8"
                  onClick={() => {
                    setEditData(cell);
                    setOpen(true);
                  }}
                />
                <Close
                  fontSize="small"
                  className="cursor-pointer color-primary m-l-8"
                  onClick={() => {
                    setDeleteId(cell._id);
                    setNotifyOpen(true);
                  }}
                />
              </div>,
              <div className="dfc-as df-wr">
                <span>
                  <strong>Email: </strong>
                  {cell.email}
                </span>
                <div>
                  <strong>Mobile No: </strong>
                  {cell.mobileNo.join(", ")}
                </div>
              </div>,
              <span>{cell.dob}</span>,
              <span>{cell.auth}</span>,
            ])}
          />
        </div>
      </div>
      <Popup
        open={open}
        handleClose={() => {
          setOpen(false);
          closeFunc();
        }}
        data={
          <UserForm
            editData={editData}
            addCloseFunc={setCloseFunc}
            update={() => {
              setUpdate((prevValue: boolean) => !prevValue);
              setOpen(false);
            }}
          />
        }
        heading="Add User"
      />
      <Popup
        open={notifyOpen}
        handleClose={() => setNotifyOpen(false)}
        heading="Delete"
        data={
          <div className="dfc-as p-a-14">
            <em className="ft-sz-24 m-b-16">
              Do you wish to delete this user?
            </em>
            <div className="df-ac-js">
              <button
                className="btn btn-danger m-r-16"
                onClick={() =>
                  userService.deleteUser(deleteId, () => {
                    setUpdate((prevValue) => !prevValue);
                    setNotifyOpen(false);
                    setDeleteId("");
                  })
                }
              >
                Delete
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setNotifyOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Users;
