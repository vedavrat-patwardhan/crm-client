import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Close } from "@mui/icons-material";
import * as actionCreators from "../Store/Actions/Actions";
import { connect } from "react-redux";
import { StoreDispatchModel } from "../Models/StoreModel";

const HamBurger: React.FC<StoreDispatchModel & { auth: string }> = ({
  thunkLogout,
  setUpdate,
  auth,
}) => {
  const url = window.location.pathname.split("/")[1];
  const ref = useRef<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  return (
    <div className="hamburger">
      {!isOpen && (
        <Menu
          onClick={() => setIsOpen(true)}
          style={{ position: "absolute" }}
        />
      )}
      <div
        className={`hamburger-menu ${isOpen ? "hamburger-menu--open" : ""}`}
        ref={ref}
      >
        <Close onClick={() => setIsOpen(false)} />
        <Link to="/dashboard" className={url === "dashboard" ? "active" : ""}>
          Dashboard
        </Link>
        {auth === "admin" && (
          <>
            <Link
              to="/analytics"
              className={url === "analytics" ? "active" : ""}
            >
              Analytics
            </Link>
            <Link to="/sales" className={url === "sales" ? "active" : ""}>
              Sales
            </Link>
            <Link to="/customer" className={url === "customer" ? "active" : ""}>
              Customer
            </Link>
            <Link to="/users" className={url === "users" ? "active" : ""}>
              Users
            </Link>
            <Link to="/reports" className={url === "reports" ? "active" : ""}>
              Reports
            </Link>
          </>
        )}
        <Link to="/profile" className={url === "profile" ? "active" : ""}>
          Profile
        </Link>
        <Link
          to="/"
          onClick={() => {
            thunkLogout!();
            setUpdate!();
          }}
        >
          Log Out
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    thunkLogout: () => dispatch(actionCreators.logout()),
    setUpdate: () => dispatch(actionCreators.setUpdate()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HamBurger);
