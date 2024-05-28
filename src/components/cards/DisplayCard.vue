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
    default: "200"
  },
  content: {
    type: String,
    default: "some data"
  },
  count: {
    type: Number,
    default: 0
  },
})
</script>

<template>
  <div class="w-full md:w-[320px] px-4 py-4 rounded-lg flex gap-2 items-center bg-white" style="height: 7rem">
    <div class="h-20 w-20 flex items-center justify-center bg-yellow-50 rounded-full"
         :class="[bgColor ? bgColor : 'bg-gray-100'] , [textColor ? textColor : 'text-gray-100']">
      <slot name="icon"></slot>
    </div>

    <div class="flex flex-col items-between w-fit  h-full">
      <span class=" text-gray-800 h-full flex flex-col items-center justify-between">
        <span class="font-extrabold text-lg capitalize">{{content}}</span>
        <span class="text-4xl text-orange-500 font-extrabold">{{count}}</span>
      </span>

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