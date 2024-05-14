<script setup>

import BaseDataTable from "@/components/base/BaseDataTable.vue";
import {ref} from "vue"
import {Delete, EditPen} from "@element-plus/icons-vue";

const columns = ref([
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: true,
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    sorter: true,
  },
  {
    title: "Registration Number",
    dataIndex: "registration_number",
    key: "registration_number",
    sorter: true,
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "actions",
    sorter: true,
  },
]);
</script>

<template>
  <div class="w-full py-4 ">
    <BaseDataTable
        :columns="columns"
        fetch-url="all-stores"
        createRouteName="register-store"
        title="Stores">
          <template v-slot:bodyCell="slotProps">
            <template v-if="slotProps.column.key === 'actions'">
<!--              {{ slotProps.text }}-->

              <ElButton type="primary" size="large" plain>
                <template #icon>
                  <EditPen class="h-fit"/>
                </template>
              </ElButton>

              <ElButton type="danger" size="large" plain>
                <template #icon>
                  <Delete class="h-fit"/>
                </template>
              </ElButton>
            </template>
          </template>
    </BaseDataTable>
  </div>
</template>

<style scoped>

</style>