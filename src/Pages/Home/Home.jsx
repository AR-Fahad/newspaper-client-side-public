import HomePlans from "./HomePlans/HomePlans";
import HomePublisher from "./HomePubilisher/HomePublisher";
import HomeSlider from "./HomeSlider/HomeSlider";
import HomeStatistics from "./HomeStatistics/HomeStatistics";
import about1 from "../../assets/man-about.jpg";
import about2 from "../../assets/about.jpg";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>NewsNook | Home</title>
      </Helmet>
      <HomeSlider></HomeSlider>
      <HomePublisher></HomePublisher>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col gap-12 lg:flex-row">
          <div className="relative lg:w-1/2">
            <img
              src={about1}
              className="rounded-xl lg:w-3/4 lg:h-[350px]"
              alt=""
            />
            <img
              src={about2}
              className="absolute rounded-xl w-1/2 top-0 lg:right-7 lg:top-52 border-8 border-white"
              alt=""
            />
          </div>
          <div className="lg:w-1/2 space-y-3">
            <h3 className="text-xl uppercase font-bold text-purple-500">
              About
            </h3>
            <h1 className="text-5xl font-bold">The Daily News</h1>
            <p className="py-6">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which do not look even
              slightly believable.
            </p>
            <p>
              the majority have suffered alteration in some form, by injected
              humour, or randomised words which do not look even slightly
              believable.
            </p>
            <br />
            <button className="btn bg-purple-500 border-none text-white">
              Get More News
            </button>
          </div>
        </div>
      </div>
      <HomePlans></HomePlans>
      <HomeStatistics></HomeStatistics>
    </div>
  );
};

export default Home;
