import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import useUser from "../Hooks/useUser";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { userDetails, isPending } = useUser();

  if (loading && isPending) {
    return (
      <div className="flex justify-center flex-col gap-4 min-h-screen">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  }

  if (user && userDetails?.role === "admin") {
    return <div>{children}</div>;
  }

  return <Navigate to="/"></Navigate>;
};

export default AdminRoutes;
