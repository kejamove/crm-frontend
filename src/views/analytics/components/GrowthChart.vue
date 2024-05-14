<template>
  <div>
    <canvas ref="chart" class="h-full"></canvas>
<!--    sme-->
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

      const chartData = {
        labels: props.chartData.map(data => data.month),
        datasets: [{
          label: 'Moves Per Month',
          data: props.chartData.map(data => data.count),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
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
</style>
