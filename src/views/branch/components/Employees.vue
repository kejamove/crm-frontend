<script setup>
import {Delete, EditPen} from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import {ref} from "vue"
import router from "@/router/index.js";

const columns = ref([
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Role",
    dataIndex: "user_type",
    key: "user_type",
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "actions",
  },
]);

const goTo = (name, id)=>{
  router.push({name: name, params: {id: id}});
}

</script>

<template>
  <router-view/>

  <BaseDataTable
      :columns="columns"
      fetch-url="list-users"
      createRouteName="create-firm"
      title="Employees">


    <template v-slot:bodyCell="slotProps">
      <template v-if="slotProps.column.key === 'actions'">
        <!--                      {{ slotProps.text }}-->

        <ElButton type="info"
                  @click="goTo('partial-firm-view', slotProps.text?.id)"
                  size="default" plain>
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
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