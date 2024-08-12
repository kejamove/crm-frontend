<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'

import BaseDialog from "@/components/base/BaseDialog.vue";
import store from "@/store/index.js";
import router from "@/router/index.js";
import {onMounted,ref} from "vue";
import MailSetup from "@/views/firm/components/MailSetup.vue";
import ListBranches from "@/views/branch/ListBranches.vue";
import ListBranchesByFirm from "@/views/branch/ListBranchesByFirm.vue";

const getFirmById = () => {
  let id = router?.currentRoute?._value?.params?.id;
  store.dispatch('fetchSingleItem', {id: id, url:'firms'}).then(res=>{
    firmData.value = res.data;
    branches.value = res.data?.branches;
  })
}

const firmData = ref({})
const branches = ref({})
const moves = ref({})


onMounted(()=>{
  getFirmById();
})


const activeName = ref('second')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

</script>

<template>
  <BaseDialog style="width: 80%">
    <template #content>
      <div class="flex flex-col gap-4">
        <h1 class="font-bold text-xl">{{firmData?.name}} : <span class="font-light text-gray-500">{{firmData?.location}}</span> </h1>


        <div class="flex items-center gap-2 flex-wrap">
          <el-tag type="info" size="large" class="w-fit"> {{firmData?.registration_number}}</el-tag>
        </div>

        <el-tabs
            v-model="activeName"
            type="card"
            class="demo-tabs"
            @tab-click="handleClick"
        >
          <el-tab-pane label="Mail Configuration" name="first">
            <MailSetup/>
          </el-tab-pane>
          <el-tab-pane label="Branches" name="second">
            <ListBranchesByFirm/>
          </el-tab-pane>
        </el-tabs>


        <h2 class="hidden">{{branches}}</h2>
      </div>
    </template>

  </BaseDialog>



</template>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>