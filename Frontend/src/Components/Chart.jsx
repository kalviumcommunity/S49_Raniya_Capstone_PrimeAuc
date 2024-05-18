import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';

ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
);

function Chart({ bids }) {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Bids Over Time",
        data: [],
        backgroundColor: 'rgba(0, 8, 20, 0.2)', // Blue with transparency
        borderColor: '#0e1b32', // Solid blue
        borderWidth: 1,
        tension: 0.4,
        fill: true,
        pointStyle: 'rect',
        pointBorderColor: '#d0a644', // Gold for point borders
        pointBackgroundColor: '#fff',
        showLine: true
      }
    ]
  });

  useEffect(() => {
    // Sort the bids array by timestamp in ascending order
    const sortedBids = [...bids].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    const timestamps = sortedBids.map(bid => new Date(bid.timestamp).toLocaleString());
    const amounts = sortedBids.map(bid => bid.amount);

    setData({
      labels: timestamps,
      datasets: [
        {
          ...data.datasets[0],
          data: amounts
        }
      ]
    });
  }, [bids]);

  return (
  
    <div className="Chart" style={{ width: '800px', height: '400px' }}>
      <Line data={data} />
    </div>

   
  );
}

export default Chart;
