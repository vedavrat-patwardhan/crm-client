import React, { useEffect, useState } from "react";
import { PageHeading } from "../Components/PageHeading";
import { Controls } from "../Components/Controls/Controls";
import { useForm } from "../Components/UseForm";
import {
  authService,
  customerService,
  reportService,
} from "../Service/Service";
import { CSVDownload } from "react-csv";

const Reports: React.FC = () => {
  const initialVal = {
    user: "",
    userStart: "",
    userEnd: "",
    company: "",
    companyStart: "",
    companyEnd: "",
  };
  const [users, setUsers] = useState<{ name: string; _id: string }[]>([]);
  const [companies, setCompanies] = useState<{ name: string; _id: string }[]>(
    []
  );
  const [csvEmployeeData, setCsvEmployeeData] = useState<any[]>([]);
  const [csvCompanyData, setCsvCompanyData] = useState<any[]>([]);

  const genCompanyReport = (data: any) => {
    const csvData = [["Assigned Employee"]];
    data.forEach((element: any) => {});
  };
  const getEmployeeReport = () => {
    reportService.employeeReport(
      values.user,
      new Date(values.userStart).getTime(),
      new Date(values.userEnd).getTime()
    );
  };
  const getCompanyReport = () => {
    reportService.companyReoprt(
      values.company,
      new Date(values.companyStart).getTime(),
      new Date(values.companyEnd).getTime(),
      genCompanyReport
    );
  };

  useEffect(() => {
    customerService.getCompnyList(setCompanies);
    authService.getUsers(setUsers);
  }, []);
  const { values, setValues } = useForm(initialVal);
  return (
    <div className="dashboard">
      <div className="dashboard__content">
        <PageHeading element={<div />} pageName="Reports" />
        <div className="content__box">
          <table className="table">
            <thead>
              <tr>
                <th>Report</th>
                <th>Entity</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Generate</th>
              </tr>
            </thead>
            <tbody className="m-t-16">
              <tr>
                <td className="va-mid">User</td>
                <td>
                  <Controls.SearchBox
                    iniVal=""
                    placeholder="Employee"
                    options={users}
                    className="search-box"
                    onChange={(selected: { name: string; _id: string }[]) => {
                      if (selected.length > 0) {
                        setValues({
                          ...values,
                          user: selected[0]._id,
                        });
                      } else {
                        setValues({ ...values, user: "" });
                      }
                    }}
                  />
                </td>
                <td>
                  <Controls.DateInput
                    handleChange={(date: Date) =>
                      setValues({ ...values, userStart: date })
                    }
                    value={values.userStart}
                  />
                </td>
                <td>
                  <Controls.DateInput
                    handleChange={(date: Date) =>
                      setValues({ ...values, userEnd: date })
                    }
                    value={values.userEnd}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={getEmployeeReport}
                  >
                    Generate
                  </button>
                  <CSVDownload data={csvEmployeeData} target="_blank" />
                </td>
              </tr>
              <tr>
                <td className="va-mid">Company</td>
                <td>
                  <Controls.SearchBox
                    iniVal=""
                    placeholder="Company"
                    options={companies}
                    className="search-box"
                    onChange={(selected: { name: string; _id: string }[]) => {
                      if (selected.length > 0) {
                        setValues({
                          ...values,
                          company: selected[0]._id,
                        });
                      } else {
                        setValues({ ...values, company: "" });
                      }
                    }}
                  />
                </td>
                <td>
                  <Controls.DateInput
                    handleChange={(date: Date) =>
                      setValues({ ...values, companyStart: date })
                    }
                    value={values.companyStart}
                  />
                </td>
                <td>
                  <Controls.DateInput
                    handleChange={(date: Date) =>
                      setValues({ ...values, companyEnd: date })
                    }
                    value={values.companyEnd}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={getCompanyReport}
                  >
                    Generate
                  </button>
                  <CSVDownload data={csvCompanyData} target="_blank" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
