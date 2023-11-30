import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../AxiosInstance/instance";

const useUser = () => {
  const { user, loading } = useContext(AuthContext);
  const { data: userDetails = {}, isPending } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      let res = {};
      if (!loading) {
        res = await axiosInstance.get(`/userDetails?email=${user?.email}`);
      }
      return res?.data;
    },
  });
  return { userDetails, isPending };
};

export default useUser;
