<script setup>

import Employees from "@/views/branch/components/Employees.vue";
import router from "@/router/index.js";

const branchId = router?.currentRoute?._value?.params?.id
const employeeUrl = `users/branch/${branchId}`
</script>

<template>
  <Employees :new-url="employeeUrl"/>
</template>

<style scoped>

</style>