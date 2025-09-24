import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log("setting again")
  const [userInfo, setUserInfo] = useState({})

  // Verify session on app mount
  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch("http://localhost:3000/auth/verify", {
          method: "GET",
          credentials: "include"
        });
        const data = await res.json();
        if(!data.success){
          setAuthenticated(false);
          setLoading(false);
          return;
        }
        console.log(data)
        setAuthenticated(data.success);
        setUserInfo(data.userInfo)
        console.log(data.msg)
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
    <AuthContext.Provider value={{ authenticated, setAuthenticated, loading, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
}
