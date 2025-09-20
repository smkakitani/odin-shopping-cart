import App from "./App";
import ErrorPage from "../components/ErrorPage";
// import NavBar from "../components/NavBar";
import Home from "../components/Home";
import Cart from "../components/Cart";
import Store from "../components/Store";



const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];

export default routes;