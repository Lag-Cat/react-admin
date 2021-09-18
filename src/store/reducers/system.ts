import { SystemActionEnum } from "./types/system";

const defaultState = {
  token: {},
  userInfo: {},
};

interface SystemActionType {
  type: SystemActionEnum;
  payload: any;
}

export default (state = defaultState, action: SystemActionType) => {
  switch (action.type) {
    case "SET_TOKEN": {
      return { ...state, token: action.payload.token };
    }
    case "SET_USERINFO":
      return { ...state, userInfo: action.payload.userInfo };
    default:
      return state;
  }
};
