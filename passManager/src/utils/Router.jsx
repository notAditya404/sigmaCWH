import { createBrowserRouter } from "react-router";
import AppMongoWithAuth from "../AppMongoWithAuth";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";



const router = createBrowserRouter([
  {
    element: <AppMongoWithAuth />,
    children:
      [
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: '/',
              element: <Home />
            }]
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/signup',
          element: <Signup />
        }
      ]
  }
])

export default router