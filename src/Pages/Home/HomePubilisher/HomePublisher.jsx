import newspapers from "../../../assets/publishers-bg.jpg";
import useArticles from "../../../useArticles/useArticles";
const HomePublisher = () => {
  const { articles } = useArticles();
  return (
    <div className="my-5">
      <h3 className="text-center uppercase text-purple-500 text-xl md:text-3xl font-bold">
        Our All Publishers
      </h3>
      <br />
      <div
        style={{
          backgroundImage: `url(${newspapers})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="py-10 px-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 bg-fixed "
      >
        {articles.map((article, idx) => (
          <div key={idx} className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title text-xl md:text-2xl lg:text-3xl font-bold">
                {article.publisher}
              </h2>
              <p>Title: {article.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePublisher;
