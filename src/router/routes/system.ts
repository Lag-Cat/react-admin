import React from "react";
export default [
  {
    name: "user",
    path: "/user/search",
    title: "用户设置",
    component: React.lazy(() => import("../../pages/system/users/userPage")),
  },
  {
    name: "menu",
    path: "/menu/search",
    title: "菜单设置",
    component: React.lazy(() => import("../../pages/system/menu/menuPage")),
  },
  {
    name: "auth",
    path: "/auth/search",
    title: "权限设置",
    component: React.lazy(() => import("../../pages/system/auth/authPage")),
  },
  {
    name: "userSettings",
    path: "/user/userSettings",
    title: "用户个人设置",
    component: React.lazy(
      () => import("../../pages/system/users/userSettings")
    ),
  },
  {
    name: "apis",
    path: "/user/apis",
    title: "api列表查询",
    component: React.lazy(
      () => import("../../pages/system/auth/apisPage")
    ),
  },
];
