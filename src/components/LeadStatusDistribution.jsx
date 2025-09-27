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

const LeadStatusDistribution = ({ statusDistributionCount }) => {
  const labels = statusDistributionCount.map((item) => item.status);
  const rawData = statusDistributionCount.map((item) => item.count);
  const statusColors = [
    "#60a5fa", // blue-400
    "#34d399", // green-400
    "#fbbf24", // yellow-400
    "#a78bfa", // purple-400
    "#f87171", // red-400
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        data: rawData,
        backgroundColor: statusColors,
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
        text: "Lead Status Distribution",
      },
    },
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};
export default LeadStatusDistribution;
