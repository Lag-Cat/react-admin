import { ReactNode } from "react";
import { BRouter, IPushProp } from "./IRouter";
export const getPathName = (path: string | undefined) => {
  let pathName = window.location.href.split("#")[1];
  if (!pathName || pathName === undefined) return "/";
  return pathName
};

export const getRouter = (routes: BRouter.IRouter[], pathName: string | undefined) => {
  if (!pathName || pathName === undefined) pathName = "/"
  return routes.find((item) => item.path === pathName);
};

export const componentNullable = (
  route: BRouter.IRouter | undefined
): ReactNode => {
  return route ? <route.component /> : <></>;
};
