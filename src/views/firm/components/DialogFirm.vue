<script setup>

import BaseDialog from "@/components/base/BaseDialog.vue";
import StoreTable from "@/views/firm/FirmList.vue";
</script>

<template>
  <BaseDialog style="width: 80%">
    <template #content>
      <StoreTable/>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>
