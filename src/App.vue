<script setup>
import { useStore } from "vuex"
import TheDashboardView from "@/components/TheDashboardView.vue";

const store = useStore()
</script>

<template>
  <div :class="{'light-mode': store.getters.getLightMode, 'dark-mode': !store.getters.getLightMode}" class="h-screen w-[100vw]">

    <!-- Your content here -->
    <router-view/>

  </div>

</template>

<style scoped>

</style>
