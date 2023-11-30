import { Helmet } from "react-helmet-async";
import useAllArticles from "../../Hooks/useAllArticles";
import usePublishers from "../../Hooks/usePublishers";
import Chart from "react-google-charts";

const AdminHome = () => {
  const { articles } = useAllArticles();
  const { publishers } = usePublishers();
  const data = [["Publisher", "Posted"]];
  publishers.forEach((publisher) => {
    data.push([
      publisher.publisher,
      articles.filter((article) => article.publisher === publisher.publisher)
        .length,
    ]);
  });
  const options = {
    title: "Each Publisher Total Posted Articles Percentage",
    is3D: true,
  };

  const options2 = {
    title: "Publishers Articles",
    curveType: "function",
    legend: { position: "bottom" },
  };

  const options3 = {
    chart: {
      title: "Posted Publishers",
      subtitle: "Each Publisher Total Posted Articles",
    },
  };

  return (
    <div className="bg-white py-10">
      <Helmet>
        <title>NewsNook | Dashboard</title>
      </Helmet>
      <div className="overflow-scroll">
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      </div>
      <br />
      <br />
      <div className="overflow-scroll">
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options2}
        />
      </div>
      <br />
      <br />
      <div className="overflow-scroll">
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={data}
          options={options3}
        />
      </div>
    </div>
  );
};

export default AdminHome;
