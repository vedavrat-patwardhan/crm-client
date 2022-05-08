export interface UserRegisterModel {
  name: string;
  mobileNo: number;
  email: string;
  dob: string;
  password: string;
  confirmPassword: string;
  adminMail: string;
  adminPassword: string;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface DashboardModel {
  _id: string;
  id: number;
  streetAddress: string;
  city: string;
  state: string;
  pincode: number;
  callDescription: string;
  companyName: { _id: string; name: string };
  customerName: string;
  email: string;
  mobile: number[];
  assignedEmployeeId: { _id: string; name: string };
  registeredBy: { _id: string; name: string };
  callStatus: string;
  startDate: string;
  startAction: string;
  problemType: string;
  expClosure: string;
  actions: {
    actionTaken: string;
    actionStarted: string;
    employee: {
      _id: string;
      name: string;
    };
    _id: string;
  }[];
}

export interface CustomersModel {
  _id?: string;
  amc: boolean;
  city: string;
  contactPerson: {
    email: string;
    mobile: string;
    name: string;
    _id?: string;
  }[];
  name: string;
  state: string;
  pincode: number;
  streetAddress: string;
}

export interface CompanyDataModel {
  company?: string;
  name: string;
  contactPerson: {
    name: string;
    email: string;
    mobile: number[];
  }[];
  streetAddress: string;
  city: string;
  state: string;
  pincode: number;
}

export interface UsersModel {
  _id: string;
  name: string;
  email: string;
  dob: string;
  mobileNo: string[];
  auth: string;
}
