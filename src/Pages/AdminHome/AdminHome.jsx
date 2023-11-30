import { Helmet } from "react-helmet-async";
import useAllArticles from "../../Hooks/useAllArticles";
import usePublishers from "../../Hooks/usePublishers";
import Chart from "react-google-charts";

const AdminHome = () => {
  const { articles } = useAllArticles();
  const { publishers } = usePublishers();
  const data = [["Task", "Per Publisher"]];
  publishers.forEach((publisher) => {
    data.push([
      publisher.publisher,
      articles.filter((article) => article.publisher === publisher.publisher)
        .length,
    ]);
  });
  const options2 = {
    title: "Publishers Articles",
    curveType: "function",
    legend: { position: "bottom" },
  };
  const options = {
    title: "Publishers Articles Percentage",
  };

  return (
    <div>
      <Helmet>
        <title>NewsNook | Dashboard</title>
      </Helmet>
      <div>
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      </div>
      <br />
      <div>
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options2}
        />
      </div>
    </div>
  );
};

export default AdminHome;
