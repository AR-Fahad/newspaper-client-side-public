import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center flex-col gap-4 min-h-screen">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-1/2"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-1/2"></div>
      </div>
    );
  }

  if (user) {
    return <div>{children}</div>;
  }

  return <Navigate state={{ from: location }} to="/login"></Navigate>;
};

export default PrivateRoutes;
