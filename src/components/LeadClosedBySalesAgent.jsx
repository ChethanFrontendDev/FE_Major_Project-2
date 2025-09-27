import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const LeadClosedBySalesAgent = ({ salesAgentName, counts }) => {
  const data = {
    labels: salesAgentName,
    datasets: [
      {
        data: counts,
        backgroundColor: [
          "#f87171",
          "#a78bfa",
          "#fbbf24",
          "#34d399",
          "#60a5fa",
        ],
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Closed Leads by Agent",
      },
    },
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};
export default LeadClosedBySalesAgent;
