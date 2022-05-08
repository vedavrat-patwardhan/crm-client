import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Assets/Logo.png";
import "./Styles/App.css";

const App: React.FC = () => {
  return (
    <div className="dfc-ac-jse ht-100vh bgc-primary">
      <img src={Logo} alt="logo" width="225" />
      <div className="app-card">
        <Link to="/login" className="form-btn m-t-16 m-b-16">
          Login
        </Link>
        <Link to="/register" className="form-btn">
          Register New User
        </Link>
      </div>
    </div>
  );
};

export default App;
