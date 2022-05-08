import React from "react";
import { connect } from "react-redux";
import { GoBack } from "../Components/GoBack";
import { StoreDispatchModel } from "../Models/StoreModel";
import * as actionCreators from "../Store/Actions/Actions";

const Logout: React.FC<StoreDispatchModel> = ({ thunkLogout, setUpdate }) => {
  return (
    <div className="ht-100vh dfc-ac-jc">
      <GoBack />
      <h1>Plz logout first to visit the page</h1>
      <button
        className="form-btn m-t-32 wd-50p"
        onClick={() => {
          thunkLogout!();
          setUpdate!();
        }}
      >
        Logout
      </button>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    thunkLogout: () => dispatch(actionCreators.logout()),
    setUpdate: () => dispatch(actionCreators.setUpdate()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
