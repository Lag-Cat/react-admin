import { BRouter } from "./IRouter";
import React from "react";

import chatRouter from "./routers/chat";
import system from "./routers/system";

const indexRouter: BRouter.IRouter[] = [
  {
    name: "home",
    path: "/home",
    title: "首页",
    component: React.lazy(() => import("../pages/home/home")),
    notCloseable: true,
  },
  {
    name: "personalSettings",
    path: "/personalSettings",
    title: "个人设置",
    component: React.lazy(() => import("../pages/system/personalSettings")),
  },
  {
    name: "login",
    path: "/login",
    title: "登录",
    component: React.lazy(() => import("../pages/system/login/login")),
    notCloseable: true,
    allowTop: true,
    withoutAuth: true,
  },
  {
    name: "register",
    path: "/register",
    title: "注册",
    component: React.lazy(() => import("../pages/system/login/register")),
    notCloseable: true,
    allowTop: true,
    withoutAuth: true,
  },
  {
    name: "page404",
    path: "/page404",
    title: "未找到页面",
    component: React.lazy(() => import("../pages/system/error/page404")),
    notCloseable: true,
    allowTop: true,
    withoutAuth: true,
  },
  {
    name: "pageNoAuth",
    path: "/pageNoAuth",
    title: "没有权限",
    component: React.lazy(() => import("../pages/system/error/pageNoAuth")),
    notCloseable: true,
    allowTop: true,
    withoutAuth: true,
  },
  {
    name: "index",
    path: "/",
    title: "主页",
    component: React.lazy(() => import("../pages/system/indexPage")),
    allowTop: true,
  },
];

const routers: BRouter.IRouter[] = [...indexRouter, ...chatRouter, ...system];

export default routers;
