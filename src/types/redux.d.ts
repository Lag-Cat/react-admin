declare interface IAction<T> {
  type: String;
  payLoad: T;
}

declare interface IIndexPageRedux {
  tabItems: TabItem[];
  drawBar: INotice[];
  activeKey: string;
}
declare interface ISystemRedux {
  token: IToken;
  userInfo: UserPublicInfo;
  photo?: string;
}

declare interface IReduxIndex {
  indexPage: IIndexPageRedux;
  system: ISystemRedux;
}
