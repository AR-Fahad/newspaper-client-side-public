import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../AxiosInstance/instance";

const useUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => axiosInstance.get("/users").then((res) => res.data),
  });
  return { users, refetch };
};

export default useUsers;
