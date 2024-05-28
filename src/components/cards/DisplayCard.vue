<script setup>

import {InfoFilled} from "@element-plus/icons-vue";

const props = defineProps({
  bgColor: {
    type: String,
    default: 'bg-red-200'
  },
  textColor: {
    type: String,
    default: 'text-red-500'
  },
  showActions: {
    type: Boolean,
    default: false
  },
  showActionsWidth: {
    type: String,
    default: 200
  },
})
</script>

<template>
  <div class="w-[320px] shadow px-4 py-8 rounded-lg flex gap-2 items-center bg-white" style="height: 7rem">
    <div class="h-20 w-20 flex items-center justify-center bg-yellow-50 rounded-full"
         :class="[bgColor ? bgColor : 'bg-gray-100'] , [textColor ? textColor : 'text-gray-100']">
      <slot name="icon"></slot>
    </div>

    <div class="flex flex-col items-between w-[240px]  h-[4rem]">
      <span class=" text-gray-800 font-bold"> <slot name="content"/> </span>

      <div
          title="Actions"
          v-if="showActions"
      >
          <span>
            <slot name="actions"></slot>
          </span>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>