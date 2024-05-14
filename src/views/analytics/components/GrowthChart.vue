<template>
  <div>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { ref, reactive } from 'vue'

export default {
  name: 'LineChart',
  components: { Line },
  setup() {
    const chartData = reactive({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          type: 'line',
          backgroundColor: '#f87979',
          borderColor: '#36495d',
          borderWidth: 3,
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    })

    const chartOptions = reactive({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          type: 'linear'
        }
      }
    })

    return {
      chartData,
      chartOptions
    }
  }
}
</script>
