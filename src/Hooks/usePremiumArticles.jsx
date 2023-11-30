import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../AxiosInstance/instance";

const usePremiumArticles = () => {
  const { data: premiumArticles = [] } = useQuery({
    queryKey: ["premiumArticles"],
    queryFn: () =>
      axiosInstance.get("/premium/articles").then((res) => res.data),
  });
  return { premiumArticles };
};

export default usePremiumArticles;
