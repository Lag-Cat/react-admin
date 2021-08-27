import React from "react";
export default [
  {
    name: "test",
    path: "/test/test1",
    title: "测试",
    component: React.lazy(() => import("../../pages/test/test")),
  },
];
