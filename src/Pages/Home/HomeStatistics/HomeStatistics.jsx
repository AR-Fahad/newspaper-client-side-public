import CountUp from "react-countup";
const HomeStatistics = () => {
  const normal = 4200,
    premium = 1200;
  const total = normal + premium;
  return (
    <div className="stats stats-vertical lg:stats-horizontal w-full my-5 shadow">
      <div className="stat text-center">
        <div className="stat-title text-purple-500">Total Users</div>
        <div className="stat-value">
          <CountUp end={total} duration={10} />
        </div>
      </div>

      <div className="stat text-center">
        <div className="stat-title text-purple-500">Normal Users</div>
        <div className="stat-value">
          <CountUp end={normal} duration={10} />
        </div>
      </div>

      <div className="stat text-center">
        <div className="stat-title text-purple-500">Premium Users</div>
        <div className="stat-value">
          <CountUp end={premium} duration={10} />
        </div>
      </div>
    </div>
  );
};

export default HomeStatistics;
