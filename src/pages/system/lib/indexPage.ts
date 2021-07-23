import store from "../../../store/index";
import routes from "../../../router/indexRoutes";

export const setActiveKey = (activeKey: string) => {
  store.dispatch({
    type: "SET_ACTIVE_KEY",
    payload: activeKey,
  });
};

export const setNewTabIfAbsent = (path: string) => {
  console.log(path);
  //const dispatch = useDispatch();
  let route = routes.find((item) => item.path === path);
  //const tabItems = useSelector((state: IReduxIndex) => state.router.tabItems)
  const tabItems = store.getState().router.tabItems;
  if (route) {
    let hasKey = tabItems.find((item) => item.name === route?.name);
    if (hasKey) setActiveKey(hasKey.id);
    else {
      let id = new Date().getTime().toString();
      store.dispatch({
        type: "ROUTER_ADD",
        payload: {
          id: id,
          name: route.name,
          title: route.title,
          content: route.component,
          notCloseable: route.notCloseable,
        },
      });
      setActiveKey(id);
    }
  }
};
