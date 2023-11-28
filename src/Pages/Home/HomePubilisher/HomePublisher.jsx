import usePublishers from "../../../Hooks/usePublishers";
import newspapers from "../../../assets/publishers-bg.jpg";
const HomePublisher = () => {
  const { publishers } = usePublishers();
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
        {publishers.map((publisher) => (
          <div key={publisher._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-3xl">{publisher.publisher}</h2>
            </div>
            <figure className="bg-white">
              <img className="h-40" src={publisher.logo} alt="Shoes" />
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePublisher;
