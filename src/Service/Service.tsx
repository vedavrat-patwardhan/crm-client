import {
  CompanyDataModel,
  CustomersModel,
  DashboardModel,
  UserRegisterModel,
  UsersModel,
} from "../Models/PagesModel";
import { bearerInstance, contentInstace } from "./Interceptors";

export const authService = {
  userRegistration(data: UserRegisterModel, resetForm: () => void) {
    contentInstace
      .post(
        `${process.env.REACT_APP_API_KEY}/register/user?adminMail=${data.adminMail}&adminPassword=${data.adminPassword}`,
        data
      )
      .then(() => resetForm())
      .catch((err) => console.error(err.response.data));
  },
  changePass(
    data: { currentPass: string; newPass: string },
    setErrors: React.Dispatch<
      React.SetStateAction<{
        currentPass: string;
        confirmNewPass: string;
      }>
    >,
    resetValues: () => void
  ) {
    bearerInstance
      .patch(`${process.env.REACT_APP_API_KEY}/change-pass`, data)
      .then(() => resetValues())
      .catch((err) => {
        setErrors(err.response.data);
      });
  },
  getUsers(
    setUsers: React.Dispatch<
      React.SetStateAction<
        {
          name: string;
          _id: string;
        }[]
      >
    >
  ) {
    bearerInstance
      .get(`${process.env.REACT_APP_API_KEY}/users-list`)
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error(err.response.status === 401);
      });
  },
};

export const dashboardService = {
  getTableData(
    page: number,
    itemsPerPage: number,
    setData: (data: { calls: DashboardModel[]; totalCalls: number }) => void
  ) {
    bearerInstance
      .get(`${process.env.REACT_APP_API_KEY}/calls/${itemsPerPage}/${page}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err: any) => err);
  },
  createCall(data: any, closeForm: () => void) {
    console.log(data);
    bearerInstance
      .post(`${process.env.REACT_APP_API_KEY}/create-call`, data)
      .then(() => closeForm())
      .catch((err) => console.error(err));
  },
  updateCall(data: any, closeForm: () => void) {
    bearerInstance
      .patch(`${process.env.REACT_APP_API_KEY}/update-call`, data)
      .then(() => closeForm())
      .catch((err) => console.error(err));
  },
  addAction(
    data: {
      _id: string;
      actionTaken: string;
      actionStarted: string;
      employee: string;
      complete: boolean;
    },
    closeForm: () => void
  ) {
    bearerInstance
      .patch(`${process.env.REACT_APP_API_KEY}/add-action`, data)
      .then(() => closeForm())
      .catch((err) => console.error(err));
  },
};

export const customerService = {
  getCompanies(
    itemsPerPage: number,
    page: number,
    updateTable: (data: CustomersModel[], totalCount: number) => void
  ) {
    bearerInstance
      .get(`${process.env.REACT_APP_API_KEY}/companies/${itemsPerPage}/${page}`)
      .then((res) => updateTable(res.data.companies, res.data.totalCompanies))
      .catch((err: any) => {
        console.error(err);
      });
  },
  getCompnyList(
    setCompanies: React.Dispatch<
      React.SetStateAction<
        {
          name: string;
          _id: string;
        }[]
      >
    >
  ) {
    bearerInstance
      .get(`${process.env.REACT_APP_API_KEY}/company-list`)
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((err: any) => {
        console.error(err);
      });
  },
  getCompany(id: string, autoFillCompany: (data: CompanyDataModel) => void) {
    bearerInstance
      .get(`${process.env.REACT_APP_API_KEY}/company-data/${id}`)
      .then((res: { data: CompanyDataModel }) => autoFillCompany(res.data))
      .catch((err: any) => {
        console.error(err);
      });
  },
  addCompany(data: any, closeForm: () => void) {
    bearerInstance
      .post(`${process.env.REACT_APP_API_KEY}/create-company`, data)
      .then(() => closeForm())
      .catch((err: any) => console.error(err));
  },
  updateCompany(id: string, data: any, closeForm: () => void) {
    bearerInstance
      .patch(`${process.env.REACT_APP_API_KEY}/update-company/${id}`, data)
      .then(() => closeForm())
      .catch((err: any) => console.error(err));
  },
  deleteCompany(id: string, closeForm: () => void) {
    bearerInstance
      .delete(`${process.env.REACT_APP_API_KEY}/delete-company/${id}`)
      .then(() => closeForm())
      .catch((err: any) => console.error(err));
  },
};

export const userService = {
  getUsers(
    itemsPerPage: number,
    page: number,
    updateTable: (data: UsersModel[], totalCount: number) => void
  ) {
    bearerInstance
      .get(`${process.env.REACT_APP_API_KEY}/users/${itemsPerPage}/${page}`)
      .then((res) => updateTable(res.data.users, res.data.totalUsers))
      .catch((err: any) => {
        console.error(err);
      });
  },
  addUser(data: any, closeForm: () => void) {
    bearerInstance
      .post(`${process.env.REACT_APP_API_KEY}/create-user`, data)
      .then(() => closeForm())
      .catch((err: any) => console.error(err));
  },
  updateUser(id: string, data: any, closeForm: () => void) {
    bearerInstance
      .patch(`${process.env.REACT_APP_API_KEY}/update-user/${id}`, data)
      .then(() => closeForm())
      .catch((err: any) => console.error(err));
  },
  deleteUser(id: string, closeForm: () => void) {
    bearerInstance
      .delete(`${process.env.REACT_APP_API_KEY}/delete-user/${id}`)
      .then(() => closeForm())
      .catch((err: any) => console.error(err));
  },
};

export const reportService = {
  companyReoprt(
    companyId: string,
    startDate: number,
    endDate: number,
    setData: (data: any) => void
  ) {
    bearerInstance
      .get(
        `${process.env.REACT_APP_API_KEY}/company-report/${companyId}/${startDate}/${endDate}`
      )
      .then((res) => setData(res.data))
      .catch((err: any) => console.error(err));
  },
  employeeReport(employeeId: string, startDate: number, endDate: number) {
    bearerInstance
      .get(
        `${process.env.REACT_APP_API_KEY}/employee-report/${employeeId}/${startDate}/${endDate}`
      )
      .then((res) => console.log(res))
      .catch((err: any) => console.error(err));
  },
};
