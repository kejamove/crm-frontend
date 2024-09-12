<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue';
import {Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend} from 'chart.js';

// Register the necessary components and scales for a bar chart
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const props = defineProps({
  chartData: Array
});

const chartCanvas = ref(null);
let chartInstance = null;

const setupChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  const labels = props.chartData.map(item => `Month ${item.month}`);
  const data = props.chartData.map(item => item.count);

  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Total Moves',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Moves Trend'
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Moves: ${context.raw}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Month'
          },
          ticks: {
            maxRotation: 45, // Rotate labels for better fit
            minRotation: 45
          }
        },
        y: {
          title: {
            display: true,
            text: 'Total Moves'
          },
          beginAtZero: true
        }
      }
    }
  });
};

onMounted(() => {
  setupChart();
});

watch(() => props.chartData, () => {
  setupChart();
});
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 510px; /* Adjust height as needed */
  width: 100%; /* Adjust width as needed */
}

canvas {
  width: 100% !important; /* Ensure canvas width fits container */
  height: 100% !important; /* Ensure canvas height fits container */
}
</style>
