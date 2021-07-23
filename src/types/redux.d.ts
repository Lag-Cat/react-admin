declare interface IAction<T> {
  type: String;
  payLoad: T;
}

declare interface IRouterRedux {
  tabItems: TabItem[];
  activeKey: string;
}

declare interface IReduxIndex {
  router: IRouterRedux;
}
