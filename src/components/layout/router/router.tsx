import { RouteObject, createHashRouter } from "react-router-dom";
import AppFrame from "../AppFrame";
import LandingPage from "../../pages/landing/LandingPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppFrame />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/block/:hash", element: <div>block</div> },
      { path: "/address/:hash", element: <div>address</div> },
      { path: "/tx/:hash", element: <div>tx</div> },
    ],
  },
];

const router = createHashRouter(routes);

export default router;
