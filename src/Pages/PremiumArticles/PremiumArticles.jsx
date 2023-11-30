import { Helmet } from "react-helmet-async";
import usePremiumArticles from "../../Hooks/usePremiumArticles";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosInstance/instance";

const PremiumArticles = () => {
  const { premiumArticles } = usePremiumArticles();
  const navigate = useNavigate();
  const handleDetails = (article) => {
    const updateArticle = {
      views: article?.views + 1,
    };
    axiosInstance
      .patch(`/articles/${article?._id}`, updateArticle)
      .then((res) => {
        if (res.data?.modifiedCount === 1) {
          navigate(`/articleDetails/${article._id}`);
        }
      });
  };
  return (
    <div>
      <Helmet>
        <title>NewsNook | Premium Articles</title>
      </Helmet>
      <h3 className="text-3xl font-bold my-5 text-center text-purple-500">
        PREMIUM ARTICLES: {premiumArticles.length}
      </h3>
      <div className="my-5 grid grid-cols-1 gap-6 px-3 md:px-6">
        {premiumArticles.map((article) => (
          <div
            key={article._id}
            className="card md:card-side bg-base-100 shadow-xl shadow-purple-500"
          >
            <figure>
              <img src={article.img} alt="Movie" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{article.title}</h2>
              <p>Publisher: {article.publisher}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => handleDetails(article)}
                  className="btn btn-sm btn-primary"
                >
                  Show Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumArticles;
