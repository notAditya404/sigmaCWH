import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [ authenticated, setAuthenticated ] = useState(false);

  useEffect(() => {
    async function verify() {
      try {
        let rawResponse = await fetch("http://localhost:3000/verify", {
          method: "GET",
          credentials: "include", // send cookies
        });

        let content = await rawResponse.json();
        let { msg, success } = content;

        if (success) {
          setAuthenticated(true);
        } else {
          console.log(msg);
          setAuthenticated(false);
        }
      } catch (err) {
        console.error("Error verifying:", err);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>; // or a spinner
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
