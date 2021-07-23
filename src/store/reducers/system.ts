import { systemAction } from "./types/system";

const defaultState = {};

interface IAction {
  type: systemAction;
  payload: any;
}

export default (state = defaultState, action: IAction) => {
  switch (action.type) {
    case "SET_TOKEN": {
      localStorage.setItem("token", action.payload.token);
      return { ...state, token: action.payload.token };
    }
    default:
      return state;
  }
};
