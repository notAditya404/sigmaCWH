import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
  const { authenticated, loading } = useAuth();


  if (loading) {
    return <h2>Loading...</h2>; // or a spinner
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
