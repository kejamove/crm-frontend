<template>
  <div>
    <canvas ref="chart" class="h-[400px] chart"></canvas>
  </div>
</template>

<script>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { Chart, registerables } from 'chart.js';

export default {
  props: ['chartData'],
  setup(props) {
    const chart = ref(null);

    const renderChart = () => {
      const ctx = chart.value.getContext('2d');
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const chartData = {
        labels: props.chartData.map(data => monthNames[data.month - 1]),
        datasets: [{
          label: 'Moves Per Month',
          data: props.chartData.map(data => data.count),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.5,
          fill: true,
        }],
      };
      const options = {
        scales: {
          y: {
            type: 'linear', // Ensure the scale type is set to 'linear'
            beginAtZero: true
          }
        }
      };

      if (chart.value && chart.value.chart) {
        chart.value.chart.destroy();
      }

      Chart.register(...registerables);

      chart.value = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: options,
        plugins: registerables
      });
    };

    onMounted(() => {
      renderChart();
    });

    onBeforeUnmount(() => {
      if (chart.value && chart.value.chart) {
        chart.value.chart.destroy();
      }
    });

    watch(() => props.chartData, () => {
      renderChart();
    });

    return { chart };
  }
};
</script>

<style scoped>
/* Add your styles here if needed */
/* Default styling for the canvas */
.chart {
  width: 100%;
  height: 100%;
}

/* Media query for large screens */
@media only screen and (min-width: 800px) {
  .chart {
    display: block;
    width: 80%;
    height: 80%;
  }
}

</style>
