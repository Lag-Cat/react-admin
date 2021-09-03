import { BRouter } from "../IRouter";
import React from "react";

const routes: BRouter.IRouter[] = [
  {
    name: "systemMonitor",
    path: "/monitor/systemMonitor",
    title: "系统监视器",
    component: React.lazy(() => import("../../pages/monitor/systemMonitor")),
  },
];

export default routes;
