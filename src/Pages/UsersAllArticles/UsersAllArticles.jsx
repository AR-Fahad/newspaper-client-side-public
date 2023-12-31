import usePublishers from "../../Hooks/usePublishers";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstance/instance";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../Hooks/useUser";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";

const UsersAllArticles = () => {
  const { user } = useContext(AuthContext);
  const { publishers } = usePublishers();
  const [articles, setArticles] = useState([]);
  const [s, setS] = useState("");
  const [p, setP] = useState("");
  const [t, setT] = useState("");
  const { userDetails } = useUser();
  const navigate = useNavigate();

  const handleDetails = (article) => {
    if (!user) {
      navigate("/login");
      return;
    }
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

  useEffect(() => {
    axiosInstance
      .get(`/articles?search=${s}&publisher=${p}&tags=${t}`)
      .then((res) => {
        setArticles(res.data);
      });
  }, [s, p, t]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const search = form.search.value;
    setS(search);
  };
  const changeTags = (e) => {
    const tags = e.target.value;
    setT(tags);
  };
  const changePublisher = (e) => {
    const publisher = e.target.value;
    setP(publisher);
  };
  return (
    <>
      <Helmet>
        <title>NewsNook | All Articles</title>
      </Helmet>
      {articles.length === 0 ? (
        <div className="flex justify-center flex-col gap-4 min-h-screen">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-10 w-full"></div>
          <div className="skeleton h-5 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ) : (
        <div>
          <h3 className="text-3xl font-bold my-5 text-center text-purple-500">
            ALL ARTICLES
          </h3>
          <div className="text-center my-5">
            <form onSubmit={handleSearch}>
              <div className="join">
                <div>
                  <div>
                    <input
                      className="input input-bordered join-item"
                      placeholder="Search..."
                      name="search"
                    />
                  </div>
                </div>

                <div className="indicator">
                  <button className="btn join-item bg-purple-500 text-white">
                    Search
                  </button>
                </div>
              </div>
            </form>
            <br />
            <div className="flex gap-5 flex-wrap justify-center my-5">
              <select
                defaultValue=""
                onChange={changeTags}
                className="select select-primary select-bordered select-sm"
              >
                <option value="" disabled>
                  Filter by tags
                </option>
                <option value="politics">Politics</option>
                <option value="technology">Technology</option>
                <option value="sports">Sports</option>
                <option value="education">Education</option>
                <option value="health">Health</option>
              </select>
              <select
                defaultValue=""
                onChange={changePublisher}
                className="select select-primary select-bordered select-sm"
              >
                <option value="" disabled>
                  Filter by publisher
                </option>
                {publishers.map((publisher) => (
                  <option value={publisher.publisher} key={publisher._id}>
                    {publisher.publisher}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="my-5 grid p-5 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              return (
                <div
                  key={article._id}
                  className={`card bg-base-100 shadow-md ${
                    article?.isPremium ? "shadow-purple-500" : ""
                  }`}
                >
                  <figure className="px-10 pt-10">
                    <img src={article.img} alt="Shoes" className="rounded-xl" />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{article.title}</h2>
                    <p>Publisher: {article.publisher}</p>
                    <p>{article.description.slice(0, 60)}...</p>
                    {article?.isPremium && (
                      <p className="text-xs font-semibold text-purple-500">
                        PREMIUM
                      </p>
                    )}
                    {article?.isPremium ? (
                      <div className="card-actions">
                        <Link
                          onClick={() => handleDetails(article)}
                          className={`btn btn-primary btn-sm ${
                            !userDetails?.subscription ? "btn-disabled" : ""
                          }`}
                        >
                          Show Details
                        </Link>
                      </div>
                    ) : (
                      <div className="card-actions">
                        <Link onClick={() => handleDetails(article)}>
                          <button className="btn btn-primary btn-sm">
                            Show Details
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default UsersAllArticles;
