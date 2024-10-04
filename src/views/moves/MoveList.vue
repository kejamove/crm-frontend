<script setup>
import {Delete, EditPen} from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import {ref} from "vue"
import router from "@/router/index.js";
import store from "@/store/index.js";
import {formatDate} from "../../utility/functions.js";
import {ElNotification} from "element-plus";


const firmUrl = router?.currentRoute?._value?.params?.id
const routeName = router?.currentRoute?._value?.name
const authData = JSON.parse(localStorage.getItem("authData"));

const loggedInUserFirm = ref(authData?.user?.firm)
const userType = authData?.user?.user_type

const fetchUrl = firmUrl ? `firms/${firmUrl}/branches` : `firms/${loggedInUserFirm}/branches`

// return by firm if we are not on branch-list url , else check if user is super admin else just fetch by id
const newFetchUrl = routeName === 'branches' ? (userType === 'super_admin' ? `branches` : fetchUrl) : fetchUrl

const editMove  = (id)=>{
  router.push({name:'edit-moves',params:{id:id}})
}


const columns = ref([
  {
    title: "Consumer Name",
    dataIndex: "",
    key: "consumer_name",
  },
  {
    title: "Move Stage",
    dataIndex: "",
    key: "move_stage",
  },
  {
    title: "Expected Move Date",
    dataIndex: "expected_move_date",
    key: "expected_move_date",
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
const sendEmail = (name, id) => {
  store.dispatch('postData', {url:`moves/${id}/send_invoice`, data:{}}).then((res)=>{
    if (res.data?.success){
      ElNotification({
        title: 'Success',
        type: "success",
        position: "top-right",
        message: 'Email Sent Successfully',
      })
    }

  });
  // router.push({name: name, params: {id: id}});
}
const downloadInvoice = (name, id) => {
  store.dispatch('fetchList', {
    url: `moves/${id}/invoice/download`,
    data: {},
    responseType: 'blob'  // Ensure the response is treated as a Blob
  })
      .then((response) => {
        // Create a Blob from the PDF stream response
        const blob = new Blob([response.data], { type: 'application/pdf' });

        // Create a download link
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `Invoice_${id}.pdf`;  // Set a name for the downloaded PDF

        // Append link to body and trigger download
        document.body.appendChild(link);
        link.click();

        // Clean up and remove the link
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading the invoice:", error);
      });
};



const updateMove = (id, move_stage, sales_representative)=>{
  console.log('called')
  store.dispatch('patchData', { id: id, url: 'moves', data: {"move_stage":move_stage, 'sales_representative':sales_representative}});
}

const move_stages = ref([
  {label: 'New Lead', value :'new_lead' },
  {label: 'Contacted', value : 'contacted'},
  {label: 'Survey Scheduled/ Online Quote Given', value : 'survey_scheduled'},
  {label: 'Proposal Sent/ Manual Quote Sent', value :'proposal_sent' },
  {label: 'Negotiations Started', value : 'negotiations_started'},
  {label: 'Won', value : 'won'},
  {label: 'Lost', value : 'lost'},
])

const deleteMove =  (id)=> {
  store.dispatch('deleteData',{id: id, url: 'moves'});
}

</script>

<template>
  <router-view/>

  <BaseDataTable
      :columns="columns"
      fetch-url="moves"
      createRouteName="create-move"
      title="Moves">
    <template v-slot:bodyCell="slotProps">

      <template v-if="slotProps.column.key === 'consumer_name'">
        <span class="flex gap-2 items-center" v-if="slotProps?.text?.consumer_name">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            {{slotProps?.text?.consumer_name}}
        </span>

        <span class="flex gap-2 items-center" v-else>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
            </svg>
            {{slotProps?.text?.corporate_name}}
        </span>

      </template>


      <template v-if="slotProps.column.key === 'confirmed_move_date'">
        {{formatDate(slotProps.text)}}
      </template>

      <template v-if="slotProps.column.key === 'move_stage'">
        <el-select
            v-model="slotProps.text.move_stage"
            class="w-[40px]"
            @change="updateMove(slotProps?.text?.id, slotProps.text.move_stage,
            slotProps?.text?.sales_representative)"
            placeholder="contacted"
            size="large"
        >
          <el-option
              v-for="move in move_stages"
              :label="move.label" :value="move.value"
          ></el-option>

        </el-select>

      </template>


      <template v-if="slotProps.column.key === 'actions'">
        <!--                      {{ slotProps.text }}-->
        <div class="flex">
          <ElButton type="info"
                    @click="goTo('move-view', slotProps.text?.id)"
                    size="default" plain>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
              </svg>
            </template>
          </ElButton>

          <ElButton type="info"

                    @click="sendEmail('invoice', slotProps.text?.id)"
                    size="default" plain>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </template>
          </ElButton>
          <ElButton type="info"

                    @click="downloadInvoice('invoice', slotProps.text?.id)"
                    size="default" plain>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </template>
          </ElButton>

          <ElButton type="primary"

                    @click="goTo('edit-move', slotProps.text?.id)"
                    size="default" plain>
            <template #icon>
              <EditPen class="h-fit"/>
            </template>
          </ElButton>

          <el-popconfirm
              confirm-button-text="Yes"
              cancel-button-text="No"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="Are you sure to delete this?"
              @confirm="deleteMove(slotProps.text?.id)"
          >
            <template #reference>
              <ElButton type="danger"

                        size="default" plain>
                <template #icon>
                  <Delete class="h-fit"/>
                </template>
              </ElButton>
            </template>
          </el-popconfirm>


        </div>

      </template>
    </template>
  </BaseDataTable>
</template>

<style scoped>

</style>