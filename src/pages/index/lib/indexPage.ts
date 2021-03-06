import store from "../../../store/index";
import routes from "../../../router/indexRoutes";
import { notification } from "antd";
import { loginOut as _loginOut, login as _login } from "../../../api/system";
import { router } from "../../../router";

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
  const tabItems: TabItem[] = (store.getState().indexPage as IIndexPageRedux)
    .tabItems;
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
interface IAddDrawItemConfig {
  title?: string;
  content?: string;
}
export const addNoticeItem = (noticeConfig: IAddDrawItemConfig) => {
  let noticeItem: INotice = {
    id: new Date().getTime().toString(),
    title: noticeConfig.title || "",
    content: noticeConfig.content || "",
    read: false,
    __isClose: false,
  };

  notification.info({
    message: noticeConfig.title,
    description: noticeConfig.content,
    placement: "bottomRight",
  });

  store.dispatch({
    type: "ADD_NOTICE",
    payload: {
      ...noticeItem,
    },
  });
};

export const removeNoticeItem = (noticeConfig: INotice) => {
  store.dispatch({
    type: "REMOVE_NOTICE",
    payload: noticeConfig.id,
  });
};

export const readNoticeItem = (noticeConfig: INotice) => {
  let nConf: INotice = { ...noticeConfig, read: true };
  store.dispatch({
    type: "UPDATE_NOTICE",
    payload: nConf,
  });
};



export const loginOut = () => {
  _loginOut().then(() => {
    localStorage.setItem("token", "");
    sessionStorage.setItem("token", "");
    store.dispatch({
      type: "SET_TOKEN",
      payload: "",
    });
  });
  router.push({ path: "/login" });
};
