<script setup>

import BaseDialog from "@/components/base/BaseDialog.vue";
import StoreTable from "@/views/admin/store/components/StoreTable.vue";
</script>

<template>
  <BaseDialog>
    <template #content>
      <StoreTable/>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>
