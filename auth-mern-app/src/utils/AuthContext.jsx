import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verify session on app mount
  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch("http://localhost:3000/verify", {
          method: "GET",
          credentials: "include"
        });
        const data = await res.json();
        setAuthenticated(data.success);
      } catch (err) {
        console.error(err);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }
    verify();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
