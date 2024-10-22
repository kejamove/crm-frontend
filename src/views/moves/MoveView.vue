<script lang="ts" setup>
import router from "@/router/index.js";
import store from "@/store/index.js";
import {onMounted,ref} from "vue";
import BaseDialog from "@/components/base/BaseDialog.vue";
import {userType} from "@/utility/constants.js";
import type { TabsPaneContext } from 'element-plus'
import CostList from "@/views/costs/CostList.vue";
import CreateEditCommission from "@/views/commissions/CreateEditCommission.vue";

const activeName = ref('details')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const loading = ref<boolean>(false);

const moveData = ref({})
const move_id = ref(router?.currentRoute?._value?.params?.id);
const getMoveById = () => {
  loading.value = true
  let id = router?.currentRoute?._value?.params?.id;
  store.dispatch('fetchSingleItem', {id: id, url:'moves'}).then(res=>{
    moveData.value.data = res.data;
    loading.value = false
  }).catch((err)=>{
    loading.value = false
    router.go(-1)
  })
}

onMounted(()=>{
  getMoveById();
})

</script>

<template>
  <BaseDialog>
    <template #content>
      <el-tabs
          v-model="activeName"
          type="card"
          class="demo-tabs"
          @tab-click="handleClick"
      >
        <router-view/>
        <el-tab-pane label="Move Details" name="details">
          <el-skeleton v-if="loading" :rows="5" animated />
          <div v-else class="flex flex-col gap-4 text-sm">
            <div class="flex items-center gap-2 flex-wrap capitalize">
              <el-tag size="large" type="info" class="w-fit  ">  {{moveData?.data?.lead_source}}</el-tag>
              <el-tag size="large" type="info" class="w-fit  ">  {{moveData?.data?.move_stage}}</el-tag>
            </div>

            <div class="w-fit text-orange-600 font-bold" >
              Invoiced Amount
            </div>
            <div class="w-fit  "> KES {{moveData?.data?.invoiced_amount}}</div>

            <div class="w-fit text-orange-600 font-bold" >
              Client / Corporate Name
            </div>
            <div
                class="w-fit flex items-center gap-2 flex-wrap ">
              <span v-if="moveData?.data?.consumer_name">
                {{moveData?.data?.consumer_name}}
              </span>
              <span v-else class="">
                {{moveData?.data?.corporate_name}}
              </span>


              <span class="">
               , {{moveData?.data?.client_email}}
              </span>
            </div>

            <div class="w-fit text-orange-600  font-bold"> Sales Representative</div>
            <div class="w-fit flex items-center gap-2 flex-wrap ">
              {{moveData?.data?.sales_representative?.first_name}} {{moveData?.data?.sales_representative?.last_name}}

              <span class="text-orange-500" v-if="userType === 'super_admin' || userType === 'firm_owner'">
            {{moveData?.data?.sales_representative_object?.user_type}}
          </span>
            </div>

            <div class="w-fit text-orange-600 "> Notes </div>
            <div class="w-fit flex items-center gap-2 flex-wrap ">
              {{moveData?.data?.notes}}
            </div>

            <div class="w-fit text-orange-600 "> Remarks </div>
            <div class="w-fit flex items-center gap-2 flex-wrap ">
              {{moveData?.data?.remarks}}
            </div>

            <!--        {{moveData}}-->
          </div>
        </el-tab-pane>
        <el-tab-pane label="Costs" name="Costs">
          <CostList :move_id="move_id"/>
        </el-tab-pane>
        <el-tab-pane label="Commission" name="Commission">
          <CreateEditCommission :move_id="move_id"/>
        </el-tab-pane>
      </el-tabs>

    </template>

    <template
        v-if="moveData?.data?.moving_from"
        #title>
      From
      {{moveData?.data?.moving_from}}
      To
      {{moveData?.data?.moving_to}}
    </template>
  </BaseDialog>

</template>

<style scoped>

</style>