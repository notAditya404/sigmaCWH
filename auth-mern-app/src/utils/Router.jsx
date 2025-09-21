import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";



const router = createBrowserRouter([
  {
    element: <App />,
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