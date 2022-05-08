import React from "react";
import { GoBack } from "../Components/GoBack";

const Unauthorized: React.FC = () => {
  return (
    <div className="ht-100vh df-ac-jc">
      <GoBack />
      <h1>You are not authorized to access this page</h1>
    </div>
  );
};

export default Unauthorized;
