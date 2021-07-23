import { ReactNode } from "react";

declare module BRouter {
  interface IRouter {
    name: string;
    path: string;
    title: string;
    component: any; // ReactNode | FunctionComponent;
    children?: IRouter[];
    notCloseable?: boolean;
    allowTop?: boolean;
    withoutAuth?: boolean;
    meta?: any;
  }

  declare type FunctionComponent = (p?: any) => ReactNode;
}

interface IPushProp {
  path: string;
}
