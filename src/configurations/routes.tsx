import { lazy } from "solid-js";

const routes = [
  { path: "/", component: lazy(() => import("../routes")) },
  {
    path: "/datetime",
    component: lazy(() => import("../routes/datetime")),
  },
];

export default routes;
