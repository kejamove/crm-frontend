<script setup>
import {ref} from 'vue'
const firmSetup = ref({})

const alertName = ()=>{
  console.log('name')
}
</script>

<template>
  <div class="app-container p-4 flex flex-col gap-4">
    <div class="flex gap-4 flex-wrap items-end">
      <div class="h-[200px] w-[200px] rounded-md border border-gray-200">
        <!--   company logo background   -->
      </div>

      <el-button type="danger" size="large">Delete Firm</el-button>
      <el-upload/>
    </div>

    <div class="font-bold text-2xl font-mono">Firm Name: Keja Move</div>

    <el-tag type="success" size="large" class="w-fit text-2xl font-bold">Setup Complete</el-tag>

    <el-checkbox-group v-model:cheked="firmSetup">
      <el-checkbox value="2">
        <template #default>
          <div class="flex items-center gap-2">
            <div class="h-full ">Setup Firm Email</div>

            <el-button type="primary" @click="alertName">
              <el-icon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </el-icon>
            </el-button>  
          </div>

        </template>
      </el-checkbox>
      <el-checkbox label="Name"/>
    </el-checkbox-group>






  </div>
</template>

<style scoped>

</style>