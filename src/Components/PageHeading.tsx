import React from "react";
import HamBurger from "./HamBurger";

export const PageHeading: React.FC<{
  element: JSX.Element;
  pageName: string;
}> = ({ element, pageName }) => {
  return (
    <div className="page__heading">
      <HamBurger />
      {element}
      <div className="heading__text">
        <strong>{pageName}</strong>
        <span>{new Date().toDateString()}</span>
      </div>
    </div>
  );
};
