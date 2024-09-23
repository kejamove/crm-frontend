<template>
  <div class="chart-container border shadow-md rounded-lg flex flex-col gap-4 p-2">

    <div class="font-semibold text-green-500 flex gap-4 items-center">
      <div class="h-18 w-18 flex items-center justify-center bg-yellow-50 rounded-full p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke-width="1.5" stroke="currentColor" class="size-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      </div>

      <div class="text-lg text-gray-900">Trend Analysis</div>
    </div>
    <canvas ref="chartCanvas"></canvas>
  </div>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';

// Register the necessary components and scales for a line chart
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip);

const props = defineProps({
  chartData: Array
});

const chartCanvas = ref(null);
let chartInstance = null;

// Function to normalize data: add missing months with a count of 0
const normalizeChartData = (data) => {
  return Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const found = data.find(item => item.month === month);
    return {
      month,
      count: found ? found.count : 0
    };
  });
};

const setupChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  // Normalize chartData to ensure all 12 months are present
  const normalizedData = normalizeChartData(props.chartData);
  const data = normalizedData.map(item => item.count);

  chartInstance = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: normalizedData.map(item => item.month),
      datasets: [{
        data: data,
        fill: false,
        borderColor: 'rgb(216,134,11)',
        borderWidth: 1,
        pointRadius: 2,
        pointBackgroundColor: 'rgb(216,134,11)'
      }]
    },
    options: {
      responsive: true,
      plugins: {
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
          display: false
        },
        y: {
          display: false,
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
  @apply md:w-[340px] relative w-full;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
