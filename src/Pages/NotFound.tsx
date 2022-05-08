import React from "react";
import { GoBack } from "../Components/GoBack";

const NotFound: React.FC = () => {
  return (
    <div className="df-ac-jc ht-100vh bgc-primary">
      <GoBack />
      <h1>404 Not Found</h1>
    </div>
  );
};

export default NotFound;
