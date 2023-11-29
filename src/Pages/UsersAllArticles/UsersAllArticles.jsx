import usePublishers from "../../Hooks/usePublishers";
import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstance/instance";

const UsersAllArticles = () => {
  const { publishers } = usePublishers();
  const [articles, setArticles] = useState([]);
  const [s, setS] = useState("");
  const [p, setP] = useState("");
  const [t, setT] = useState("");

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
              className={`card bg-base-100 shadow-xl ${
                article?.isPremium ? "border-[2px] border-purple-500" : ""
              }`}
            >
              <figure className="px-10 pt-10">
                <img src={article.img} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{article.title}</h2>
                <p>Publisher: {article.publisher}</p>
                <p>{article.description}</p>
                {article?.isPremium && (
                  <p className="text-xs font-semibold text-purple-500">
                    PREMIUM
                  </p>
                )}
                {article?.isPremium ? (
                  <div className="card-actions">
                    <button className="btn btn-primary btn-sm" disabled>
                      Show Details
                    </button>
                  </div>
                ) : (
                  <div className="card-actions">
                    <button className="btn btn-primary btn-sm">
                      Show Details
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UsersAllArticles;
