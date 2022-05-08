import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Controls } from "../Controls/Controls";
import { useForm } from "../UseForm";
import { authService, dashboardService } from "../../Service/Service";
import { getRemark } from "../../Service/Collection";

export const ActionForm: React.FC<{
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
  setCloseFunc: React.Dispatch<React.SetStateAction<() => () => void>>;
  data: any;
}> = ({ setUpdate, handleClose, setCloseFunc, data }) => {
  const tommorow = new Date();
  const [complete, setComplete] = useState<boolean>(false);
  tommorow.setDate(tommorow.getDate() + 1);
  const initialValue = {
    actionTaken: "Forwarded",
    actionStarted: new Date().getTime(),
    employee: "",
    remark: "",
  };
  const [iniVal, setIniVal] = useState<{ employee: string; remark: string }>({
    employee: "",
    remark: "",
  });
  const { values, setValues } = useForm(initialValue);
  const [users, setUsers] = useState<{ name: string; _id: string }[]>([]);

  const handleCheckbox = (value: string) => {
    setValues({ ...values, actionTaken: value });
    setComplete(value === "Closed");
  };
  const handleUpdate = () => {
    handleClose();
    setValues(initialValue);
    setUpdate((prevValue) => !prevValue);
  };
  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    dashboardService.addAction(
      {
        _id: data._id,
        actionTaken: values.remark ? values.remark : values.actionTaken,
        actionStarted: values.actionStarted,
        employee: values.employee,
        complete,
      },
      handleUpdate
    );
  };
  useEffect(() => {
    authService.getUsers(setUsers);
    setCloseFunc(() => () => {
      setValues(initialValue);
      setIniVal({ employee: "clear", remark: "clear" });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className="action-form min-wd-65r p-a-24 " onSubmit={handleSubmit}>
      <div className="action-form__col">
        <strong>
          Call Id: <span>{data.id}</span>
        </strong>
        <strong>
          Customer Name: <span>{data.companyName}</span>
        </strong>
        <strong>
          Problem Type: <span>{data.problemType}</span>
        </strong>
        <Controls.SearchBox
          iniVal={iniVal.employee}
          placeholder="Employee"
          options={users}
          className="search-box"
          onChange={(selected: { name: string; _id: string }[]) => {
            if (selected.length > 0) {
              setValues({ ...values, employee: selected[0]._id });
              setIniVal({ ...iniVal, employee: selected[0].name });
            } else {
              setValues({ ...values, employee: "" });
              setIniVal({ ...iniVal, employee: "" });
            }
          }}
        />
        <Controls.SearchBox
          iniVal={iniVal.remark}
          placeholder="Remark"
          options={getRemark}
          className="search-box"
          onChange={(selected: { name: string }[]) => {
            if (selected.length > 0) {
              setValues({ ...values, remark: selected[0].name });
              setIniVal({ ...iniVal, remark: selected[0].name });
            } else {
              setValues({ ...values, remark: "" });
              setIniVal({ ...iniVal, remark: "" });
            }
          }}
        />
      </div>
      <div className="action-form__col">
        <strong>
          Description: <span>{data.description}</span>
        </strong>
        <div className="df-ac">
          <input
            type="checkbox"
            name="forward"
            onChange={() => handleCheckbox("Forwarded")}
            checked={values.actionTaken === "Forwarded"}
          />
          <span className="m-l-16">Forward</span>
        </div>
        <div className="df-ac m-t-16">
          <input
            type="checkbox"
            name="close"
            id=""
            onChange={() => handleCheckbox("Closed")}
            checked={values.actionTaken === "Closed"}
          />
          <span className="m-l-16">Close</span>
        </div>
        <button className="form-btn wd-30p m-t-16" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
