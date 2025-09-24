import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

export default function ProtectedRoute() {
  const { authenticated, loading } = useAuth();
  console.log(authenticated)

  if (loading) {
    return <h2>Loading...</h2>; // or a spinner
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  console.log("giving home")
  return <Outlet />;
}
