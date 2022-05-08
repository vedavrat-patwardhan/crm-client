import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Table } from "../Components/Table";
import { Edit, Close } from "@mui/icons-material";
import { CustomersModel } from "../Models/PagesModel";
import { Popup } from "../Components/Popups/Popup";
import { CustomerForm } from "../Components/Popups/CustomerForm";
import { customerService } from "../Service/Service";
import { TableSorting } from "../Components/TableSorting";
import { PageHeading } from "../Components/PageHeading";

const Customers: React.FC = () => {
  const [update, setUpdate] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<string>("");
  const [totalCompanies, setTotalCompanies] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [tableData, setTableData] = useState<CustomersModel[]>([]);
  const [filteredTableData, setFilteredTableData] = useState<CustomersModel[]>(
    []
  );

  const [deleteId, setDeleteId] = useState<string>("");
  const [notifyOpen, setNotifyOpen] = useState<boolean>(false);
  const [closeFunc, setCloseFunc] = useState<() => () => void>(() => () => {});
  const headers = ["Company Name", "Address", "Contact Info"];

  const handleSearch = (e: BaseSyntheticEvent) =>
    setSearch(e.target.value.toLowerCase());
  const handleFilter = (option: string) => setFilters(option);
  const setReset = () => {
    setFilters("");
    setSearch("");
    setFilteredTableData(tableData);
  };
  const handleItems = (option: string) => setItemsPerPage(+option);
  const updateTable = (data: CustomersModel[], totalCount: number) => {
    setTableData(data);
    setFilteredTableData(data);
    setTotalCompanies(totalCount);
  };

  useEffect(() => {
    customerService.getCompanies(itemsPerPage, page, updateTable);
  }, [itemsPerPage, page, update]);

  const handleApply = () => {
    setFilteredTableData(
      tableData.filter((values) => {
        return (
          values.pincode.toString().includes(search) ||
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
              New Customer
            </button>
          }
          pageName="Customers"
        />
        <div className="content__box">
          <div className="table__filter">
            <TableSorting
              search={search}
              searchPlaceHolder="Search by Company Name or Pincode"
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
              <div className="df-ac max-wd-26r">
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
                    setDeleteId(cell._id!);
                    setNotifyOpen(true);
                  }}
                />
              </div>,
              <div className="df-ac df-wr max-wd-26r">
                <span>
                  {`${cell.streetAddress}, ${cell.city}, ${cell.state} - ${cell.pincode}`}
                </span>
              </div>,
              <div className="dfc-as">
                {cell.contactPerson.map((actions: any, i: number) => (
                  <div key={i} className="dfc-as">
                    <span>{"Name : " + actions.name}</span>
                    <span>{"Email : " + actions.email}</span>
                    <span>{"Mobile : " + actions.mobile}</span>
                  </div>
                ))}
              </div>,
            ])}
          />
        </div>
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
                    customerService.deleteCompany(deleteId, () => {
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
        <Popup
          open={open}
          handleClose={() => {
            setOpen(false);
            closeFunc();
          }}
          data={
            <CustomerForm
              editData={editData}
              addCloseFunc={setCloseFunc}
              update={() => {
                setUpdate((prevValue: boolean) => !prevValue);
                setOpen(false);
              }}
            />
          }
          heading="Add Company"
        />
      </div>
    </div>
  );
};

export default Customers;
