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
import Login from "../Components/Login/Login";
import AddMenu from "../Pages/Admin/AddMenu/AddMenu";
import ManageItems from "../Pages/Admin/ManageItems/ManageItems";




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
        path: '/cart-page',
        element: <CartPage></CartPage>
      },
      {
        path: '/update-profile',
        element: <UpdateProfile></UpdateProfile>
      },

    ],
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>
  },
  {
    path: 'dashboard',
    element: <DashBordLayOut></DashBordLayOut>,
    children: [
      {
        path: '',
        element: <DashBord></DashBord>
      },
      {
        path: 'users',
        element: <Users></Users>
      },
      {
        path: 'add-menu',
        element: <AddMenu></AddMenu>
      },
      {
        path:'manage-items',
        element:<ManageItems></ManageItems>
      }
    ]
  }
]);

export default router