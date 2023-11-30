import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../AxiosInstance/instance";

const useUser = () => {
  const { user, loading } = useContext(AuthContext);
  const {
    data: userDetails = {},
    isPending,
    refetch,
  } = useQuery({
    enabled: !loading,
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/userDetails?email=${user?.email}`);
      return res.data;
    },
  });
  return { userDetails, isPending, refetch };
};

export default useUser;
