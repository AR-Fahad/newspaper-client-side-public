import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";

const ArticleDetails = () => {
  const article = useLoaderData();
  console.log(article);
  return (
    <div className="p-10">
      <Helmet>
        <title>NewsNook | Article Details</title>
      </Helmet>
      <h3 className="text-center text-xl md:text-2xl font-bold text-purple-500">
        Title: {article.title}
      </h3>
      <br />
      <img className="w-full" src={article.img} alt="" />
      <br />
      <p className=" text-xl md:text-2xl font-bold">
        Publisher: {article.publisher}
      </p>
      <p>Description: {article.description}</p>
    </div>
  );
};

export default ArticleDetails;
