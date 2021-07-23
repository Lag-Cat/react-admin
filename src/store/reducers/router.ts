const defaultState: IRouterRedux = {
  tabItems: [],
  activeKey: "",
};

export default (state = defaultState, action: any) => {
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
    default:
      return state;
  }
};
