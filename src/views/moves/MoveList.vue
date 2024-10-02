<script setup>
import {Delete, EditPen} from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import {ref} from "vue"
import router from "@/router/index.js";
import store from "@/store/index.js";
import {formatDate} from "../../utility/functions.js";

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
    dataIndex: "consumer_name",
    key: "consumer_name",
  },
  {
    title: "Corporate Name",
    dataIndex: "corporate_name",
    key: "corporate_name",
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

      <template v-if="slotProps.column.key === 'expected_move_date'">
        {{formatDate(slotProps.text)}}
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
                    link
                    @click="goTo('move-view', slotProps.text?.id)"
                    size="default" plain>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
              </svg>
            </template>
          </ElButton>

          <ElButton type="primary"
                    link
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
                        link
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