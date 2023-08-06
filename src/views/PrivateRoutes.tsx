import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "../features/auth/authSlice";
import { restoreSession } from "../apiService";
import { RootState } from "../type";

function PrivateRoutes() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.value);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await restoreSession();
        const currentUser = response.data.user;
        dispatch(setUser(currentUser));
      } catch (error) {
        console.error(error);
        dispatch(setUser(null));
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [dispatch]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return currentUser ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
