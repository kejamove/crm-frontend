<script setup>
import {Delete, EditPen} from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import {ref} from "vue"
import router from "@/router/index.js";
import store from "@/store/index.js";

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
    title: "Moving From",
    dataIndex: "moving_from",
    key: "moving_from",
  },
  {
    title: "Moving To",
    dataIndex: "moving_to",
    key: "moving_to",
  },
  {
    title: "Move Stage",
    dataIndex: "move_stage",
    key: "move_stage",
  },
  {
    title: "Invoiced Amount",
    dataIndex: "invoiced_amount",
    key: "invoiced_amount",
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