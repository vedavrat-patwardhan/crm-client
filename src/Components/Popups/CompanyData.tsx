import React, { useEffect, useState } from "react";
import { CompanyDataModel } from "../../Models/PagesModel";
import { customerService } from "../../Service/Service";

export const CompanyData: React.FC<{ companyId: string }> = ({ companyId }) => {
  const [companyData, setCompanyData] = useState<CompanyDataModel>({
    city: "",
    contactPerson: [
      {
        email: "",
        mobile: [],
        name: "",
      },
    ],
    name: "",
    state: "",
    pincode: 0,
    streetAddress: "",
  });

  const autoFillCompany = (data: CompanyDataModel) => {
    setCompanyData({
      city: data.city,
      contactPerson: data.contactPerson,
      name: data.name,
      state: data.state,
      pincode: data.pincode,
      streetAddress: data.streetAddress,
    });
  };
  useEffect(() => {
    if (companyId) {
      customerService.getCompany(companyId, autoFillCompany);
    }
  }, [companyId]);
  return (
    <div className="p-lr-24 p-tb-12 dfc-as min-wd-40r ft-sz-20">
      <strong>{"Name: " + companyData.name}</strong>
      <br />
      <span>
        {"Address: " +
          companyData.streetAddress +
          ", " +
          companyData.city +
          ", " +
          companyData.state +
          "-" +
          companyData.pincode}
      </span>
      <br />
      <strong>Contact :</strong>
      <br />
      {companyData.contactPerson.map(
        (person: { email: string; mobile: number[]; name: string }) => (
          <div className="dfc-as" key={person.email}>
            <span>{"Name: " + person.name}</span>
            <span>{"Email: " + person.email}</span>
            <span>
              {"Mobile No: " + person.mobile.map((num: number) => num + " ")}
            </span>
            <br />
          </div>
        )
      )}
    </div>
  );
};
