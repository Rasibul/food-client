import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import SignUp from "../Components/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import UpdateProfile from "../Pages/DashBord/UserDashBord/UpdateProfile";
import CartPage from "../Pages/CartPage";
import DashBordLayOut from "../LayOut/DashBordLayOut";
import DashBord from "../Pages/Admin/DashBord/DashBord";
import Users from "../Pages/Admin/DashBord/Users";




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
        element: <PrivateRoute>
          <Menu></Menu>
        </PrivateRoute>
      },
      {
        path:'/cart-page',
        element:<CartPage></CartPage>
      },
      {
        path:'/update-profile',
        element:<UpdateProfile></UpdateProfile>
      },

    ],
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>
  },
  {
    path:'dashbord',
    element:<DashBordLayOut></DashBordLayOut>,
    children:[
      {
        path:'',
        element:<DashBord></DashBord>
      },
      {
        path:'users',
        element:<Users></Users>
      }
    ]
  }
]);

export default router