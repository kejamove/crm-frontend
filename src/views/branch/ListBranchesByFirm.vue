<script setup>
import {Delete, EditPen} from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import {ref} from "vue"
import router from "@/router/index.js";

const firmUrl = router?.currentRoute?._value?.params?.id
const routeName = router?.currentRoute?._value?.name
const authData = JSON.parse(localStorage.getItem("authData"));

const loggedInUserFirm = ref(authData?.user?.firm)
const userType = authData?.user?.user_type

const fetchUrl = `list-firms/${firmUrl}/branches`



const columns = ref([
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Registration Number",
    dataIndex: "registration_number",
    key: "registration_number",
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "actions",
  },
]);

const goTo = (name, id) => {
  router.push({name: name, params: {id: id}});
}


</script>

<template>
  <router-view/>
  <BaseDataTable
      :columns="columns"
      :fetch-url="fetchUrl"
      createRouteName="create-branch"
      title="Branches">


    <template v-slot:bodyCell="slotProps">
      <template v-if="slotProps.column.key === 'actions'">
        <!--                      {{ slotProps.text }}-->

        <ElButton type="info"
                  @click="goTo('partial-firm-view', slotProps.text?.id)"
                  size="default" plain>
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
            </svg>
          </template>
        </ElButton>

        <ElButton type="primary" size="default" plain>
          <template #icon>
            <EditPen class="h-fit"/>
          </template>
        </ElButton>

        <ElButton type="danger" size="default" plain>
          <template #icon>
            <Delete class="h-fit"/>
          </template>
        </ElButton>
      </template>
    </template>
  </BaseDataTable>
</template>

<style scoped>

</style>