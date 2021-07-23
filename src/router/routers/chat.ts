import { BRouter } from "../IRouter";
import React from "react";

const chatRouter: BRouter.IRouter[] = [
  {
    name: "messageRecord",
    path: "/messageRecord",
    title: "消息",
    component: React.lazy(() => import("../../pages/chat/chat")),
  },
];

export default chatRouter;
