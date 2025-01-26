import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../pages/Cart"
import Checkout from "../pages/Checkout";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import Order from "../pages/Order";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import { Dashboard } from "../pages/dashboard/Dashboard";
import DashboardHome from "../pages/dashboard/DashboardHome";
import ManageBooks from "../pages/dashboard/manage/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import EditBook from "../pages/dashboard/EditBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        )
      },
      {
        path: "/about",
        element: <div>About</div>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute >
            <Checkout />
          </PrivateRoute>
        )
      },
      {
        path: "/books/:id",
        element: <SingleBook />
      },

    ]
  },
  {
    path: "/admin",
    element: <AdminLogin />
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <AdminRoute>
            <DashboardHome />
          </AdminRoute>

        )
      },
      {
        path: "addBook",
        element: (
          <AdminRoute>
            <AddBook />
          </AdminRoute>
        )
      },
      {
        path: "editBook/:id",
        element: (
          <AdminRoute>
            <EditBook />
          </AdminRoute>
        )
      },
      {
        path: "manageBooks",
        element: (
          <AdminRoute>
            <ManageBooks />
          </AdminRoute>
        )
      }
    ]
  },
])

export default router;