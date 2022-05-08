import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Controls } from "../Controls/Controls";

export const ContactForm: React.FC<{
  addContact: (contact: {
    name: string;
    email: string;
    mobile: string[];
  }) => void;
  setCloseFunc: React.Dispatch<React.SetStateAction<() => () => void>>;
  editContact: any;
}> = ({ addContact, setCloseFunc, editContact }) => {
  const initialValues = {
    name: "",
    email: "",
    mobile: "",
  };
  const [values, setValues] = useState<{
    name: string;
    email: string;
    mobile: string;
  }>(initialValues);
  const resetForm = () => {
    setValues(initialValues);
  };
  useEffect(() => {
    setCloseFunc(() => resetForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCloseFunc]);
  useEffect(() => {
    if (editContact.name) {
      console.log(editContact);
      setValues({
        ...editContact,
        mobile:
          editContact.mobile.length > 0 ? editContact.mobile.join(", ") : "",
      });
    }
  }, [editContact]);

  return (
    <div className="dfc-ac wd-30r p-a-14">
      <Controls.NormalInput
        placeholder="Name"
        name="name"
        value={values.name}
        handleInput={(e: BaseSyntheticEvent) => {
          setValues({ ...values, name: e.target.value });
        }}
      />
      <Controls.NormalInput
        className="m-t-16 m-b-16"
        placeholder="Email"
        name="email"
        value={values.email}
        handleInput={(e: BaseSyntheticEvent) => {
          setValues({ ...values, email: e.target.value });
        }}
      />
      <Controls.NormalInput
        placeholder="Phone number"
        name="mobile"
        value={values.mobile}
        handleInput={(e: BaseSyntheticEvent) => {
          setValues({ ...values, mobile: e.target.value });
        }}
      />
      <figcaption className="blockquote-footer m-0">
        Add multiple contacts using ', '
      </figcaption>
      <button
        type="submit"
        onClick={() => {
          const contact = { ...values, mobile: [...values.mobile.split(", ")] };
          addContact(contact);
          resetForm();
        }}
        className="btn btn-success m-t-16"
      >
        Add Contact
      </button>
    </div>
  );
};
