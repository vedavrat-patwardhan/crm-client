import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import App from "../App";
import { connect } from "react-redux";
import { StoreModel } from "../Models/StoreModel";
const Logout = lazy(() => import("../Pages/Logout"));
const Register = lazy(() => import("../Pages/Register"));
const Login = lazy(() => import("../Pages/Login"));
const Dashboard = lazy(() => import("../Pages/Dashboard"));
const Analytics = lazy(() => import("../Pages/Analytics"));
const Sales = lazy(() => import("../Pages/Sales"));
const Customers = lazy(() => import("../Pages/Customers"));
const Users = lazy(() => import("../Pages/Users"));
const Reports = lazy(() => import("../Pages/Reports"));
const Profile = lazy(() => import("../Pages/Profile"));
const Unauthorized = lazy(() => import("../Pages/Unauthorized"));
const NotFound = lazy(() => import("../Pages/NotFound"));

const getRoutes = (auth: string) => {
  switch (auth) {
    case "admin":
    case "sales admin":
      return (
        <>
          <Route path="/" element={<Logout />} />
          <Route path="/resgister" element={<Logout />} />
          <Route path="/login" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/users" element={<Users />} />
          <Route path="/customer" element={<Customers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
        </>
      );
    case "user":
      return (
        <>
          <Route path="/" element={<Logout />} />
          <Route path="/resgister" element={<Logout />} />
          <Route path="/login" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sales" element={<Unauthorized />} />
          <Route path="/analytics" element={<Unauthorized />} />
          <Route path="/users" element={<Unauthorized />} />
          <Route path="/customer" element={<Unauthorized />} />
          <Route path="/reports" element={<Unauthorized />} />
        </>
      );
    default:
      return (
        <>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Unauthorized />} />
          <Route path="/sales" element={<Unauthorized />} />
          <Route path="/analytics" element={<Unauthorized />} />
          <Route path="/customer" element={<Unauthorized />} />
          <Route path="/reports" element={<Unauthorized />} />
          <Route path="/profile" element={<Unauthorized />} />
          <Route path="/users" element={<Unauthorized />} />
        </>
      );
  }
};
const ProtectedRoutes: React.FC<StoreModel> = ({ auth }) => {
  return (
    <Suspense
      fallback={
        <div className="df-ac-jc ht-100vh">
          <div className="loader" />
        </div>
      }
    >
      <Routes>
        {getRoutes(auth)}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const mapStateToProps = (state: StoreModel) => {
  return {
    token: state.token,
    update: state.update,
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(ProtectedRoutes);
