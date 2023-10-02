import { RouteObject, createHashRouter } from "react-router-dom";
import AppFrame from "../AppFrame";
import LandingPage from "../../pages/landing/LandingPage";
import BlockPage from "../../pages/block/BlockPage";
import AddressPage from "../../pages/address/AddressPage";
import TransactionPage from "../../pages/transaction/TransactionPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppFrame />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/block/:hash", element: <BlockPage /> },
      { path: "/address/:hash", element: <AddressPage /> },
      { path: "/transaction/:hash", element: <TransactionPage /> },
    ],
  },
];

const router = createHashRouter(routes);

export default router;
