import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJs,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJs.register(ArcElement, Tooltip, Legend);

const TotalLeadsClosed = ({
  totalLeadsClosedByLastWeek,
  totalLeadsInPipeline,
}) => {
  const data = {
    labels: ["Total Leads Closed By Last Week", "Total Leads in Pipeline"],
    datasets: [
      {
        data: [totalLeadsClosedByLastWeek.length, totalLeadsInPipeline.totalLeadsInPipeline],
        backgroundColor: ["#e66868ff", "#febf5aff"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: " Total Leads closed and in Pipeline"
      }
    },
  };

  return (
    <div >
      <Pie data={data} options={options} />
    </div>
  );
};
export default TotalLeadsClosed;
