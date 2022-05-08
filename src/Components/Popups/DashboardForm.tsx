import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Controls } from "../Controls/Controls";
import { useForm } from "../UseForm";
import {
  authService,
  customerService,
  dashboardService,
} from "../../Service/Service";
import { CompanyDataModel } from "../../Models/PagesModel";
import { getTypesOfProblem } from "../../Service/Collection";

export const DashboardForm: React.FC<{
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
  editData: any;
  openForm: boolean;
}> = ({ setUpdate, handleClose, editData, openForm }) => {
  const tommorow = new Date();
  tommorow.setDate(tommorow.getDate() + 1);
  const initialValue = {
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
    callDescription: "",
    companyName: "",
    contactPerson: "",
    email: "",
    mobile: [],
    assignedEmployeeId: "",
    callStatus: "Unallocated",
    startDate: new Date(),
    startAction: "",
    problemType: "",
    expClosure: new Date().getHours() > 12 ? tommorow : new Date(),
    actions: [],
  };
  const { values, setValues, handleInput } = useForm(initialValue);
  const [editing, setEditing] = useState<boolean>(false);
  const [users, setUsers] = useState<{ name: string; _id: string }[]>([]);
  const [companies, setCompanies] = useState<{ name: string; _id: string }[]>(
    []
  );
  const [iniVal, setIniVal] = useState({
    companyName: "",
    contactPerson: "",
    assignedEmployeeId: "",
    problemType: "",
  });
  const [customers, setCustomers] = useState<
    { name: string; email: string; mobile: number[] }[]
  >([]);
  const handleReset = () => {
    setValues(initialValue);
    setIniVal({
      companyName: "",
      contactPerson: "",
      assignedEmployeeId: "",
      problemType: "",
    });
  };
  const closeForm = () => {
    setUpdate((prevValue: boolean) => !prevValue);
    handleClose();
    handleReset();
    setEditing(false);
  };
  const autoFillCompany = (data: CompanyDataModel) => {
    setCustomers(data.contactPerson);
    setValues({
      ...values,
      companyName: data.company,
      streetAddress: data.streetAddress,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
    });
  };
  const autoFillCustomer = (data: {
    name: string;
    email: string;
    mobile: number[];
  }) => {
    if (data) {
      setValues({
        ...values,
        contactPerson: data.name,
        email: data.email,
        mobile: data.mobile,
      });
    } else {
      setValues({
        ...values,
        contactPerson: "",
        email: "",
        mobile: [],
      });
    }
  };
  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (editing) {
      dashboardService.updateCall(
        {
          ...values,
          startDate: values.startDate.getTime(),
          expClosure: values.expClosure.getTime(),
        },
        closeForm
      );
    } else {
      dashboardService.createCall(
        {
          ...values,
          startDate: values.startDate.getTime(),
          expClosure: values.expClosure.getTime(),
        },
        closeForm
      );
    }
  };
  useEffect(() => {
    if (editData._id) {
      setEditing(true);
      setIniVal({
        companyName: editData.companyName,
        contactPerson: editData.contactPerson,
        assignedEmployeeId: editData.assignedEmployeeId,
        problemType: editData.problemType,
      });
      setValues({
        ...editData,
        startDate: new Date(editData.startDate.toString()),
        expClosure: new Date(editData.expClosure.toString()),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData, openForm]);
  useEffect(() => {
    if (!openForm) {
      handleReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openForm]);

  useEffect(() => {
    customerService.getCompnyList(setCompanies);
    authService.getUsers(setUsers);
  }, []);

  return (
    <form className="dashboard-form min-wd-75r p-a-24 " onSubmit={handleSubmit}>
      <div className="dashboard-form__col-1">
        <div className="df-ac wd-100p">
          <Controls.SearchBox
            className="m-r-16 search-box"
            placeholder="Company Name"
            options={companies}
            iniVal={iniVal.companyName}
            onChange={(selected: { name: string; _id: string }[] | string) => {
              if (!Array.isArray(selected)) {
                setValues({ ...values, companyName: selected });
                return;
              }
              if (selected.length > 0) {
                customerService.getCompany(selected[0]._id, autoFillCompany);
                return;
              }
              setCustomers([]);
              setValues({
                ...values,
                companyName: "",
                streetAddress: "",
                city: "",
                state: "",
                pincode: "",
              });
            }}
          />
          <AddCircleOutlineIcon className="ft-sz-32 cursor-pointer on-hover-black" />
        </div>
        <strong>Contact Person</strong>
        <div className="df-ac wd-100p">
          <div className="df-ac wd-50p">
            <Controls.SearchBox
              iniVal={iniVal.contactPerson}
              className="m-r-8 search-box"
              placeholder="Customer Name"
              options={customers}
              onChange={(
                selected: { name: string; email: string; mobile: number[] }[]
              ) => {
                autoFillCustomer(selected[0]);
              }}
            />
          </div>
          <Controls.NormalInput
            placeholder="Email"
            handleInput={handleInput}
            name="email"
            value={values.email}
            className="wd-50p m-r-8"
          />
          <AddCircleOutlineIcon className="ft-sz-32 cursor-pointer on-hover-black" />
        </div>
        <Controls.NormalInput
          placeholder="Mobile Number"
          handleInput={
            handleInput /*update it in future to maintain [Number] */
          }
          name="mobile"
          value={values.mobile}
          className="m-b-16"
        />
        <strong>Address :</strong>
        <Controls.NormalInput
          placeholder="Street Address"
          handleInput={handleInput}
          name="streetAddress"
          value={values.streetAddress}
          className="m-b-16"
        />
        <div className="df-ac">
          <Controls.NormalInput
            placeholder="City"
            handleInput={handleInput}
            name="city"
            value={values.city}
            className="m-r-8"
          />
          <Controls.NormalInput
            placeholder="State"
            handleInput={handleInput}
            name="state"
            value={values.state}
            className="m-r-8"
          />
          <Controls.NormalInput
            placeholder="Pincode"
            handleInput={handleInput}
            name="pincode"
            value={values.pincode}
          />
        </div>
        <strong>Call assign to :</strong>
        <Controls.SearchBox
          iniVal={iniVal.assignedEmployeeId}
          placeholder="Employee"
          options={users}
          className="m-r-8 search-box"
          onChange={(selected: { name: string; _id: string }[]) => {
            if (selected.length > 0) {
              setValues({ ...values, assignedEmployeeId: selected[0]._id });
            } else {
              setValues({ ...values, assignedEmployeeId: "" });
            }
          }}
        />
      </div>
      <div className="dashboard-form__col-2">
        <div className="df-ac">
          <div className="dfc wd-50p m-r-16">
            <em>Start Date: </em>
            <Controls.DateInput
              handleChange={(date: Date) =>
                setValues({ ...values, startDate: date })
              }
              value={values.startDate}
            />
          </div>
          <div className="dfc wd-50p">
            <em>End Date: </em>
            <Controls.DateInput
              handleChange={(date: Date) =>
                setValues({ ...values, expClosure: date })
              }
              value={values.expClosure}
            />
          </div>
        </div>
        <strong>Problem Type:</strong>
        <Controls.SearchBox
          iniVal={iniVal.problemType}
          placeholder="Problem Type"
          options={getTypesOfProblem}
          className="m-b-16 search-box"
          onChange={(selected: { name: string }[]) => {
            if (selected.length > 0) {
              setValues({ ...values, problemType: selected[0].name });
            } else {
              setValues({ ...values, problemType: "" });
            }
          }}
        />
        <strong>Call Description :</strong>
        <textarea
          name="callDescription"
          value={values.callDescription}
          onChange={handleInput}
          placeholder="Call Description"
          cols={30}
          rows={6}
          className="m-b-16 form-control"
        />
        <div className="df-ac ">
          <button className="btn btn-primary wd-30p m-r-16" type="submit">
            Submit
          </button>
          <button
            className="btn btn-secondary wd-30p"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};
