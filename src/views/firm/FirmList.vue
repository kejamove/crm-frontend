<script setup>
import {Delete, EditPen} from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import {ref} from "vue"
import router from "@/router/index.js";
import store from "@/store/index.js";

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

const goTo = (name, id)=>{
  router.push({name: name, params: {id: id}});
}
const allowDelete = ref('');

const deleteFirm =  (id)=> {
  store.dispatch('downloadFirmData',{id: id, url: 'export-firm-data'}).then((res)=>{
    store.dispatch('deleteData',{id: id, url: 'delete-firm'});
  })
  allowDelete.value = ''
}

const downloadFirmData =  (id)=> {
  store.dispatch('downloadFirmData',{id: id, url: 'export-firm-data'})
}

</script>

<template>
  <router-view/>

  <BaseDataTable
      :columns="columns"
      fetch-url="list-firms"
      createRouteName="create-firm"
      title="Firms">


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

        <ElButton type="primary"
                  @click="goTo('edit-firm', slotProps.text?.id)"
                  size="default" plain>
          <template #icon>
            <EditPen class="h-fit"/>
          </template>
        </ElButton>

        <el-popover
            placement="bottom"
            title=""
            :width="300"
            trigger="click"
        >
          <template #reference>
            <ElButton type="danger"
                      title="Fire User"
                      size="default" plain>
              <template #icon>
                <Delete class="h-fit"/>
              </template>
            </ElButton>
          </template>

          <template #default>
            <div class="flex flex-col gap-2 text-lg">

              <span class="text-orange-500">When a firm is deleted all its data is lost</span>

              <p>You will receive everything about your firm in an excel sheet but you will not be able to find it in our database</p>

              <el-form
                  label-position="top"
              >
                <el-form-item label="Type delete to confirm">
                  <el-input placeholder="delete" v-model="allowDelete" size="large"></el-input>
                </el-form-item>
              </el-form>

              <el-button
                  type="danger"
                  class="capitalize"
                  :disabled="allowDelete == 'delete' ? false : true"
                  @click="deleteFirm(slotProps.text?.id)"
                  size="large">
                confirm and delete
              </el-button>
            </div>

          </template>

        </el-popover>

        <ElButton
                  @click="downloadFirmData(slotProps.text?.id)"
                  title="Download Data About Firm"
                  size="default" plain>
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
            </svg>
          </template>
        </ElButton>

      </template>

    </template>
  </BaseDataTable>
</template>

<style scoped>

</style>