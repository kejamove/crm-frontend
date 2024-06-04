<script setup>

import BaseDialog from "@/components/base/BaseDialog.vue";
</script>

<template>
  <BaseDialog>
    <template #content>
      {
      name:'move-view',
      path:'move-view/:id',
      component: MoveView,
      }
    </template>

    <template #title>
      Create | Edit Move
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>