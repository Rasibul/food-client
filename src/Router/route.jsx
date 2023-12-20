import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import SignUp from "../Components/SignUp/SignUp";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/menu",
        element: <Menu></Menu>
      },

    ],
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>
  }
]);

export default router