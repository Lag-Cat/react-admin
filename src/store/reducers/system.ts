import { SystemActionEnum } from "./types/system";

const defaultState = {};

interface SystemActionType {
  type: SystemActionEnum;
  payload: any;
}

export default (state = defaultState, action: SystemActionType) => {
  switch (action.type) {
    case "SET_TOKEN": {
      localStorage.setItem("token", action.payload.token);
      return { ...state, token: action.payload.token };
    }
    default:
      return state;
  }
};
