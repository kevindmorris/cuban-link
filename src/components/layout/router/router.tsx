import { RouteObject, createHashRouter } from "react-router-dom";
import AppFrame from "../AppFrame";
import LandingPage from "../../pages/landing/LandingPage";
import BlockPage from "../../pages/block/BlockPage";
import TransactionPage from "../../pages/transaction/TransactionPage";
import AddressPage from "../../pages/address/AddressPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppFrame />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/block/:id", element: <BlockPage /> },
      { path: "/address/:id", element: <AddressPage /> },
      { path: "/tx/:id", element: <TransactionPage /> },
    ],
  },
];

const router = createHashRouter(routes);

export default router;
