import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";

const PrivateRoute = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {

    const checkUser = async () => {
      try {

        const res = await axios.get(
          `${serverUrl}/user/current`,
          { withCredentials: true }
        );

        if (res.data.success) {
          setIsAuth(true);
        }

      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

  }, []);

  if (loading) return null;

  // ❌ Not logged in → go to signin
  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }

  // ✅ Logged in → allow access
  return children;
};

export default PrivateRoute;