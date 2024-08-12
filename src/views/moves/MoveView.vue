<script setup>
import router from "@/router/index.js";
import store from "@/store/index.js";
import {onMounted,ref} from "vue";
import BaseDialog from "@/components/base/BaseDialog.vue";
import {userType} from "@/utility/constants.js";

const moveData = ref({})

const getMoveById = () => {
  let id = router?.currentRoute?._value?.params?.id;
  console.log(id, 'iddd')
  store.dispatch('fetchSingleItem', {id: id, url:'moves'}).then(res=>{
    moveData.value.data = res.data;
  }).catch((err)=>{
    console.log(err.message)
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

      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2 flex-wrap capitalize">
          <el-tag size="large" type="info" class="w-fit text-xl font-bold">  {{moveData?.data?.lead_source}}</el-tag>
          <el-tag size="large" type="info" class="w-fit text-xl font-bold">  {{moveData?.data?.move_stage}}</el-tag>
        </div>


        <div class="w-fit text-xl font-bold"> KES {{moveData?.data?.invoiced_amount}}</div>

        <div class="w-fit text-2xl font-bold"> Client </div>
        <div class="w-fit flex items-center gap-2 flex-wrap ">
          {{moveData?.data?.consumer_name}}
          <span class="text-orange-500">
            {{moveData?.data?.client_email}}
          </span>

        </div>

        <div class="w-fit text-2xl font-bold"> Corporate Name </div>
        <div class="w-fit flex items-center gap-2 flex-wrap ">
          {{moveData?.data?.corporate_name}}
        </div>

        <div class="w-fit text-2xl font-bold"> Sales Representative</div>
        <div class="w-fit flex items-center gap-2 flex-wrap ">
          {{moveData?.sales_representative_object?.first_name}} {{moveData?.sales_representative_object?.last_name}}

          <span class="text-orange-500" v-if="userType === 'super_admin' || userType === 'firm_owner'">
            {{moveData?.sales_representative_object?.user_type}}
          </span>
        </div>

        <div class="w-fit text-2xl font-bold"> Notes </div>
        <div class="w-fit flex items-center gap-2 flex-wrap ">
          {{moveData?.data?.notes}}
        </div>

        <div class="w-fit text-2xl font-bold"> Remarks </div>
        <div class="w-fit flex items-center gap-2 flex-wrap ">
          {{moveData?.data?.remarks}}
        </div>

<!--        {{moveData}}-->
      </div>


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