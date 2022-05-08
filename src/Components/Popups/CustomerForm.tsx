import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { authService, customerService } from "../../Service/Service";
import { Edit, Close } from "@mui/icons-material";
import { Controls } from "../Controls/Controls";
import { useForm } from "../UseForm";
import { ContactForm } from "./ContactForm";
import { Popup } from "./Popup";

export const CustomerForm: React.FC<{
  editData: any;
  update: () => void;
  addCloseFunc: React.Dispatch<React.SetStateAction<() => () => void>>;
}> = ({ editData, update, addCloseFunc }) => {
  const initialVal = {
    name: "",
    contactPerson: [],
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
    amc: { maintain: false, day: -1, week: -1, employee: "" },
  };
  const [open, setOpen] = useState<boolean>(false);
  const [editContact, setEditContact] = useState({});
  const [cpIndex, setCpIndex] = useState<number>(-1);
  const [amcWeek, setAmcWeek] = useState<string>("Week");
  const [amcDay, setAmcDay] = useState<string>("Day");
  const [users, setUsers] = useState<{ name: string; _id: string }[]>([]);
  const [closeFunc, setCloseFunc] = useState<() => () => void>(() => () => {});
  const [editing, setEditing] = useState<boolean>(false);
  // const [errors, setErrors] = useState<{
  //   contactEmail: string;
  //   mobileNo: string;
  // }>({ contactEmail: "", mobileNo: "" });
  const { values, setValues, handleInput } = useForm(initialVal);

  const addContact = (contact: {
    name: string;
    email: string;
    mobile: string[];
  }) => {
    if (cpIndex === -1) {
      setValues({
        ...values,
        contactPerson: [...values.contactPerson, contact],
      });
    } else {
      const cp = [...values.contactPerson];
      cp[cpIndex] = { ...contact };
      setValues({
        ...values,
        contactPerson: [...cp],
      });
      setCpIndex(-1);
    }

    setOpen(false);
  };
  const closeForm = () => {
    update();
    setEditing(false);
    setValues(initialVal);
  };
  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (editing) {
      customerService.updateCompany(editData._id, values, closeForm);
    } else {
      customerService.addCompany(values, closeForm);
    }
  };
  useEffect(() => {
    authService.getUsers(setUsers);
  }, []);
  useEffect(() => {
    addCloseFunc(() => closeForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addCloseFunc]);
  useEffect(() => {
    if (editData._id) {
      setEditing(true);
      setValues(editData);
    } else {
      setEditing(false);
      setValues(initialVal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);
  return (
    <div className="dashboard-form min-wd-75r p-a-24 ">
      <div className="dashboard-form__col-1">
        <strong>Company Name :</strong>
        <Controls.NormalInput
          placeholder="Company Name"
          handleInput={handleInput}
          name="name"
          value={values.name}
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
            type="number"
            handleInput={handleInput}
            name="pincode"
            value={values.pincode}
          />
        </div>
      </div>
      <div className="dashboard-form__col-2">
        <strong>Contact Person :</strong>
        <div className="df-ac">
          {values.contactPerson.map(
            (
              contact: { name: string; email: string; mobile: string },
              index: number
            ) => (
              <div key={contact.email} className="p-lr-12 m-r-8 name-box">
                {contact.name}
                <Edit
                  className="m-l-4 m-r-4 cursor-pointer on-hover-black"
                  fontSize="small"
                  onClick={() => {
                    setEditContact(contact);
                    setCpIndex(index);
                    setOpen(true);
                  }}
                />
                <Close
                  className="cursor-pointer on-hover-black"
                  fontSize="small"
                  onClick={() => {
                    const cp = [...values.contactPerson];
                    cp.splice(index, 1);
                    setValues({ ...values, contactPerson: [...cp] });
                  }}
                />
              </div>
            )
          )}
        </div>
        <button
          className="btn btn-success"
          type="button"
          onClick={() => setOpen(true)}
        >
          Add contact +
        </button>
        <div className="df-ac m-t-16">
          <input
            type="checkbox"
            name="amc"
            onChange={() =>
              setValues({
                ...values,
                amc: { ...values.amc, maintain: !values.amc.maintain },
              })
            }
            checked={values.amc.maintain}
          />
          <span className="m-l-16">AMC</span>
        </div>
        {values.amc.maintain && (
          <div className="df-ac-jsb wd-100p">
            <Controls.DropDown
              placeholder={amcWeek}
              options={["1st", "2nd", "3rd", "4th", "Daily"]}
              handleInput={(option: string) => {
                switch (option) {
                  case "1st":
                    setAmcWeek("1st");
                    setValues({ ...values, amc: { ...values.amc, week: 1 } });
                    break;
                  case "2nd":
                    setAmcWeek("2nd");
                    setValues({ ...values, amc: { ...values.amc, week: 2 } });
                    break;
                  case "3rd":
                    setAmcWeek("3rd");
                    setValues({ ...values, amc: { ...values.amc, week: 3 } });
                    break;
                  case "4th":
                    setAmcWeek("4th");
                    setValues({ ...values, amc: { ...values.amc, week: 4 } });
                    break;
                  case "Daily":
                    setAmcWeek("Daily");
                    setValues({ ...values, amc: { ...values.amc, week: 0 } });
                    break;
                  default:
                    return;
                }
              }}
              dropClsss="amc-week"
            />
            {amcWeek !== "Daily" && (
              <Controls.DropDown
                placeholder={amcDay}
                options={[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ]}
                handleInput={(option: string) => {
                  switch (option) {
                    case "Sunday":
                      setAmcDay("Sunday");
                      setValues({ ...values, amc: { ...values.amc, day: 0 } });
                      break;
                    case "Monday":
                      setAmcDay("Monday");
                      setValues({ ...values, amc: { ...values.amc, day: 1 } });
                      break;
                    case "Tuesday":
                      setAmcDay("Tuesday");
                      setValues({ ...values, amc: { ...values.amc, day: 2 } });
                      break;
                    case "Wednesday":
                      setAmcDay("Wednesday");
                      setValues({ ...values, amc: { ...values.amc, day: 3 } });
                      break;
                    case "Thursday":
                      setAmcDay("Thursday");
                      setValues({ ...values, amc: { ...values.amc, day: 4 } });
                      break;
                    case "Friday":
                      setAmcDay("Friday");
                      setValues({ ...values, amc: { ...values.amc, day: 5 } });
                      break;
                    case "Saturday":
                      setAmcDay("Saturday");
                      setValues({ ...values, amc: { ...values.amc, day: 6 } });
                      break;
                    default:
                      return;
                  }
                }}
                dropClsss="amc-week"
                btnClass="m-l-8"
              />
            )}
            <Controls.SearchBox
              //@ts-ignore:next-line
              iniVal={
                editData.amc
                  ? users.find(
                      (user: { name: string; _id: string }) =>
                        user._id === editData.amc.employee
                    )
                  : ""
              }
              placeholder="Employee"
              options={users}
              className="m-l-8 search-box"
              onChange={(selected: { name: string; _id: string }[]) => {
                if (selected.length > 0) {
                  setValues({
                    ...values,
                    amc: { ...values.amc, employee: selected[0]._id },
                  });
                } else {
                  setValues({
                    ...values,
                    amc: { ...values.amc, employee: "" },
                  });
                }
              }}
            />
          </div>
        )}
        <button className="btn btn-primary m-t-16" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <Popup
        open={open}
        handleClose={() => {
          setOpen(false);
          closeFunc();
        }}
        data={
          <ContactForm
            addContact={addContact}
            setCloseFunc={setCloseFunc}
            editContact={editContact}
          />
        }
        heading="Add Contact"
      />
    </div>
  );
};
