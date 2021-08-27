import { IndexPageActionEunm } from "./types/indexPage";

declare type IndexPageActionT = {
  type: IndexPageActionEunm;
  payload: any;
};

const defaultState: IIndexPageRedux = {
  tabItems: [],
  drawBar: [],
  activeKey: "",
};

export default (
  state = defaultState,
  action: IndexPageActionT
): IIndexPageRedux => {
  switch (action.type) {
    case "ROUTER_ADD":
      return {
        ...state,
        tabItems: [...state.tabItems, ...[action.payload]],
      };

    case "ROUTER_ADD_IF_ABSENT":
      if (state.tabItems.find((item) => item.id === action.payload.id))
        return state;
      else
        return {
          ...state,
          tabItems: [...state.tabItems, ...[action.payload]],
        };
    case "REMOVE_ADD":
      return {
        ...state,
        tabItems: state.tabItems.filter((item) => item.id !== action.payload),
      };
    case "REMOVE_ALL":
      return {
        ...state,
        tabItems: [],
      };
    case "SET_ACTIVE_KEY":
      return {
        ...state,
        activeKey: action.payload,
      };
    case "ADD_NOTICE":
      return {
        ...state,
        drawBar: [...state.drawBar, ...[action.payload]],
      };
    case "REMOVE_NOTICE":
      return {
        ...state,
        drawBar: state.drawBar.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_NOTICE":
      return {
        ...state,
        drawBar: state.drawBar.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }
          return item;
        }),
      };
    default:
      return state;
  }
};
