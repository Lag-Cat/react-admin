interface TabItem {
  id: string;
  name: string;
  title: string;
  content: ReactNode | BRouter.FunctionComponent;
  notCloseable?: boolean;
}

interface INotice {
  id: string;
  title: string;
  content: string;
  read: boolean;
  __isClose: boolean;
}
