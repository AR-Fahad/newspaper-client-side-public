import { useEffect } from "react";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axiosInstance from "../../../AxiosInstance/instance";
const HomeSlider = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axiosInstance.get("/articles").then((res) => {
      const sortedData = res.data.slice(0, 6).sort((a, b) => b.views - a.views);
      setArticles(sortedData);
    });
  }, []);
  return (
    <>
      <Carousel
        dynamicHeight={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
      >
        {articles.map((article, idx) => (
          <div key={idx} className="relative">
            <div className="absolute h-full flex items-center top-0 pl-7 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]">
              <div className="text-white">
                <h3 className="text-xl lg:text-4xl font-extrabold">
                  {article.title}
                </h3>
                <br />
                <p className="hidden md:flex">{article.description}</p>
              </div>
            </div>
            <img src={article.img} />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default HomeSlider;
