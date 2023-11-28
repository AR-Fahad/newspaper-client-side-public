import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../AxiosInstance/instance";

const usePublishers = () => {
  const { data: publishers = [], refetch } = useQuery({
    queryKey: ["publishers"],
    queryFn: () => axiosInstance.get("/publishers").then((res) => res.data),
  });
  return { publishers, refetch };
};

export default usePublishers;
