interface TabItem {
  id: string;
  name: string;
  title: string;
  content: ReactNode | BRouter.FunctionComponent;
  notCloseable?: boolean;
}
