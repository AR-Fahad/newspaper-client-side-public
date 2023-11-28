import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../AxiosInstance/instance";

const useAllArticles = () => {
  const { data: articles = [], refetch } = useQuery({
    queryKey: ["allArticles"],
    queryFn: () => axiosInstance.get("/admin/articles").then((res) => res.data),
  });
  return { articles, refetch };
};

export default useAllArticles;
