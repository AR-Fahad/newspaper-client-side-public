import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../AxiosInstance/instance";

const useUser = () => {
  const { user } = useContext(AuthContext);
  const { data: userDetails = {} } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () =>
      axiosInstance
        .get(`/userDetails?email=${user?.email}`)
        .then((res) => res.data),
  });
  return { userDetails };
};

export default useUser;
