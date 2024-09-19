<!--<template>-->
<!--  <div class="chart-container">-->
<!--    <canvas class="hidden" width="200px" ref="chartCanvas"></canvas>-->
<!--    <canvas class="md:hidden" ref="chartCanvas"></canvas>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import {ref, onMounted, watch} from 'vue';-->
<!--import {Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend} from 'chart.js';-->

<!--// Register the necessary components and scales for a bar chart-->
<!--Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);-->

<!--const props = defineProps({-->
<!--  chartData: Array-->
<!--});-->

<!--const chartCanvas = ref(null);-->
<!--let chartInstance = null;-->

<!--// Function to normalize data: add missing months with a count of 0-->
<!--const normalizeChartData = (data) => {-->
<!--  const normalizedData = Array.from({length: 12}, (_, index) => {-->
<!--    const month = index + 1;-->
<!--    const found = data.find(item => item.month === month);-->
<!--    return {-->
<!--      month,-->
<!--      count: found ? found.count : 0-->
<!--    };-->
<!--  });-->
<!--  return normalizedData;-->
<!--};-->

<!--const setupChart = () => {-->
<!--  if (chartInstance) {-->
<!--    chartInstance.destroy();-->
<!--  }-->

<!--  // Normalize chartData to ensure all 12 months are present-->
<!--  const normalizedData = normalizeChartData(props.chartData);-->

<!--  const labels = normalizedData.map(item => `Month ${item.month}`);-->
<!--  const data = normalizedData.map(item => item.count);-->

<!--  console.log(normalizedData);-->

<!--  chartInstance = new Chart(chartCanvas.value, {-->
<!--    type: 'bar',-->
<!--    data: {-->
<!--      labels: labels,-->
<!--      datasets: [-->
<!--        {-->
<!--          label: 'Total Moves',-->
<!--          data: data,-->
<!--          backgroundColor: 'rgba(192,176,75,0.2)',-->
<!--          borderColor: 'rgb(216,134,11)',-->
<!--          borderWidth: 1-->
<!--        }-->
<!--      ]-->
<!--    },-->
<!--    options: {-->
<!--      responsive: true,-->
<!--      plugins: {-->
<!--        title: {-->
<!--          display: false,-->
<!--          text: 'Moves Trend'-->
<!--        },-->
<!--        tooltip: {-->
<!--          callbacks: {-->
<!--            label: function (context) {-->
<!--              return `Moves: ${context.raw}`;-->
<!--            }-->
<!--          }-->
<!--        }-->
<!--      },-->
<!--      scales: {-->
<!--        x: {-->
<!--          title: {-->
<!--            display: true,-->
<!--            text: 'Month'-->
<!--          },-->
<!--          ticks: {-->
<!--            maxRotation: 45, // Rotate labels for better fit-->
<!--            minRotation: 45-->
<!--          }-->
<!--        },-->
<!--        y: {-->
<!--          title: {-->
<!--            display: true,-->
<!--            text: 'Total Moves'-->
<!--          },-->
<!--          beginAtZero: true-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  });-->
<!--};-->

<!--onMounted(() => {-->
<!--  setupChart();-->
<!--});-->

<!--watch(() => props.chartData, () => {-->
<!--  setupChart();-->
<!--});-->
<!--</script>-->

<!--<style scoped>-->

<!--canvas {-->
<!--  width: 100% !important; /* Ensure canvas width fits container */-->
<!--}-->
<!--</style>-->
<template>
  <div class="chart-container">
    <canvas class="hidden" width="200px" ref="chartCanvas"></canvas>
    <canvas class="md:hidden" ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components and scales for a line chart
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const props = defineProps({
  chartData: Array
});

const chartCanvas = ref(null);
let chartInstance = null;

// Function to normalize data: add missing months with a count of 0
const normalizeChartData = (data) => {
  const normalizedData = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const found = data.find(item => item.month === month);
    return {
      month,
      count: found ? found.count : 0
    };
  });
  return normalizedData;
};

const setupChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  // Normalize chartData to ensure all 12 months are present
  const normalizedData = normalizeChartData(props.chartData);

  const labels = normalizedData.map(item => `Month ${item.month}`);
  const data = normalizedData.map(item => item.count);

  console.log(normalizedData);

  chartInstance = new Chart(chartCanvas.value, {
    type: 'line', // Changed from 'bar' to 'line'
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Total Moves',
          data: data,
          fill: false, // Ensures the area under the line is not filled
          borderColor: 'rgb(216,134,11)', // Line color
          backgroundColor: 'rgb(250,151,2)', // Point hover background color
          borderWidth: 2, // Line width
          pointRadius: 5, // Size of the points on the line
          pointBackgroundColor: 'rgb(216,134,11)' // Point color
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: false,
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
  height: 100px; /* Default height */
  width: 600px; /* Make sure the container takes full width */
}

canvas {
  width: 600px !important; /* Ensure canvas width fits container */
  height: 100px !important; /* Ensure canvas height adapts */
}
/* Mobile devices: Adjust height for smaller screens */
@media (max-width: 767px) {
  .chart-container {
    height: 250px; /* Reduce height for smaller screens */
  }

  canvas {
    width: 100% !important; /* Keep width at 100% */
    height: 250px !important; /* Ensure the canvas height is reduced */
  }
}

/* Tablets: Medium screens */
@media (min-width: 768px) and (max-width: 1023px) {
  .chart-container {
    height: 300px; /* Slightly larger height for tablets */
  }

  canvas {
    height: 300px !important; /* Adjust canvas height */
  }
}

/* Larger screens */
@media (min-width: 1024px) {
  .chart-container {
    height: 500px; /* Larger height for desktop */
  }

  canvas {
    height: 500px !important; /* Adjust canvas height */
  }
}
</style>
