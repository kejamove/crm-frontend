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
  <div class="w-[320px] shadow p-4 rounded-lg flex gap-2 items-center bg-white">
    <div class="h-14 w-14 flex items-center justify-center bg-yellow-50 rounded-full"
         :class="[bgColor ? bgColor : 'bg-gray-100'] , [textColor ? textColor : 'text-gray-100']">
      <slot name="icon"></slot>
    </div>

    <div class="flex flex-col items-between w-[240px]">
      <div class="flex items-center justify-between">
        <h1 class="text-lg text-gray-700"><slot name="title"/></h1>

        <el-popover
            placement="bottom"
            title="Actions"
            :width="showActionsWidth"
            v-if="showActions"
            trigger="hover"
        >
          <template #reference>
            <info-filled class="h-8 w-8 cursor-pointer hover:text-gray-600 text-gray-500"/>
          </template>

          <template #default>
            <slot name="actions"></slot>
          </template>
        </el-popover>
      </div>
      <p class=" text-gray-800 font-bold"> <slot name="content"/> </p>
    </div>
  </div>
</template>

<style scoped>

</style>