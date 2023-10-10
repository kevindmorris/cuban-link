import { RouteObject, createHashRouter } from "react-router-dom";
import AppFrame from "../AppFrame";
import LandingPage from "../../pages/landing/LandingPage";
import BlockPage from "../../pages/block/BlockPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppFrame />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/block/:id", element: <BlockPage /> },
      { path: "/address/:id", element: <div>address</div> },
      { path: "/tx/:id", element: <div>tx</div> },
    ],
  },
];

const router = createHashRouter(routes);

export default router;
