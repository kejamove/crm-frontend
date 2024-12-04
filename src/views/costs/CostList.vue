<script setup>
import {Delete, EditPen} from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import {ref, onMounted} from "vue"
import router from "@/router/index.js";
import store from "@/store/index.js";
import {formatCurrency} from "@/utility/functions.js";
import CreateEditCost from "@/views/costs/CreateEditCost.vue";

const columns = ref([
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "actions",
  },
]);

const props = defineProps({
  move_id : {
    type : Number,
    required: true,
  }
})

const loader = ref(false)
const commissionData = ref(null)
const emit = defineEmits();

const getCommission = ()=>{
  loader.value = true
  commissionData.value = null
  store.dispatch("fetchList", {url: `commissions/?move=${props.move_id}`}).
  then((res)=>{
    store.state.commissionData = res.data[0]
    loader.value = false
  })
      .catch((err)=>{
        loader.value = false
      })
}

const goTo = (name, id)=>{
  router.push({name: name, params: {id: id}});
}
const allowDelete = ref('');

const deleteFirm = async (id) => {
  try {
    // Start by downloading all relevant data for the firm
    await downloadFirmData(id);

    // Once the data is downloaded, proceed with deleting the firm
    await store.dispatch('deleteData', { id: id, url: 'organizations' });

    // Reset any UI-related states if needed
    allowDelete.value = '';
  } catch (error) {
    console.error('Error during firm deletion:', error);
  }
};

const downloadFirmData =  (id)=> {
  downloadDataLoading.value = true;
  store.dispatch('downloadExcelByUrl', [
    { id: id, url: 'users' },
    { id: id, url: 'moves' },
    { id: id, url: 'branches' },
    { id: id, url: 'firms' },
  ])
      .then(res => {
        downloadDataLoading.value = false;
      })
  ;
  // store.dispatch('downloadFirmData',{id: id, url: 'export-firm-data'}).then((res)=> downloadDataLoading.value = false)
}

const downloadDataLoading = ref(false)

const dialogVisible = ref(false)

onMounted(()=>{
  getCommission()
})

const fetchUrl = `move-costs/?move=${props.move_id}`;

</script>

<template>
  <router-view/>

  <el-skeleton :rows="1" v-if="loader" animated/>
  <el-tag v-else size="large" class="w-fit">
    Commission : {{formatCurrency(store?.state?.commissionData?.commission_to_be_issued)}}
    at {{ store?.state?.commissionData?.commission_percentage }} %
  </el-tag>

  <el-dialog
      v-model="dialogVisible"
      title="New Cost"
      width="500"
      :before-close="()=>{
        dialogVisible = false
      }"
  >
    <span>
       <CreateEditCost :move_id="move_id"/>
    </span>
  </el-dialog>


  <BaseDataTable
      :columns="columns"
      :fetch-url="fetchUrl"
      @trailingReload="getCommission"
      show-other-items
      title="Costs">

    <template #otherItems>
      <el-button size="large" @click="()=>{
          dialogVisible = true
        }"
                 type="primary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </el-button>
    </template>


    <template v-slot:bodyCell="slotProps">

      <template v-if="slotProps.column.key === 'actions'">
        <!--                      {{ slotProps.text }}-->


        <ElButton type="primary"
                  @click="()=>{
                        router.push({name:'edit-cost', params:{costId: slotProps.text?.id}});
                      }"
                  size="default" plain>
          <template #icon>
            <EditPen class="h-fit"/>
          </template>
        </ElButton>

        <ElButton type="danger"
                  @click="()=>{
                        store.dispatch('deleteData', {url:'move-costs', id:slotProps.text?.id});
                        emit('trailingReload');
                      }"
                  size="default" plain>
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