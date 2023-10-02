import { RouteObject, createBrowserRouter } from "react-router-dom";
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
      { path: "/block/:id", element: <BlockPage /> },
      { path: "/address/:id", element: <AddressPage /> },
      { path: "/transaction/:id", element: <TransactionPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
