import { StoreModel } from "../../Models/StoreModel";
import * as actionTypes from "../Actions/Actions";

const initialState = {
  update: false,
  token: "",
  auth: "",
};

const reducer = (state: StoreModel = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_UPDATE:
      return {
        ...state,
        update: !state.update,
      };
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.value,
      };
    case actionTypes.SET_AUTH:
      return {
        ...state,
        auth: action.value,
      };
  }
  return state;
};

export default reducer;
