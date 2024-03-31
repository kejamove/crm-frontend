<script setup>
import { useStore } from "vuex"

const store = useStore()
</script>

<template>
  <div :class="{'light-mode': store.getters.getLightMode, 'dark-mode': !store.getters.getLightMode}">

    <!-- Your content here -->
    <router-view/>
  </div>

</template>

<style scoped>

</style>
