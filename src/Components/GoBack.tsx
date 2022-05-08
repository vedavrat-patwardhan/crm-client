import React from "react";
import { useNavigate } from "react-router-dom";

export const GoBack: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="go-back">
      <button className="go-back__btn" onClick={() => navigate(-1)}>
        <strong className="color-primary">Back</strong>
      </button>
    </div>
  );
};
