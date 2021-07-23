declare interface column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (data: any) => any | undefined;
}
