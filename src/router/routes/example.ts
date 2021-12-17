import { BRouter } from "../IRouter";
import React from "react";

const routes: BRouter.IRouter[] = [
  {
    name: "echartsDemo",
    path: "/example/echartsDemo",
    title: "echarts案例",
    component: React.lazy(() => import("../../pages/example/echartsDemo")),
  },
  {
    name: "webworker",
    path: "/example/webworker",
    title: "webworker案例",
    component: React.lazy(() => import("../../pages/example/webworker")),
  },
  {
    name: "websocket",
    path: "/example/websocket",
    title: "websocket案例",
    component: React.lazy(() => import("../../pages/example/websocket")),
  },
];

export default routes