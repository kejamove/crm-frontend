<script setup>

import DisplayCard from "@/components/cards/DisplayCard.vue";
import {FolderOpened, Open, Plus, Shop, UserFilled} from "@element-plus/icons-vue";
import {useStore} from "vuex";
import {onMounted, ref, watch} from "vue";
import BaseLoader from "@/components/base/BaseLoader.vue";
import {useRouter} from "vue-router";
import GrowthChart from "@/views/analytics/components/GrowthChart.vue";
// import {activeUser, userType} from "@/utility/constants.js"

const activeUser =  JSON.parse(localStorage.getItem("authData"))?.user;
const store = useStore()
const router = useRouter()
const storeLoading = ref(false);

const registeredFirms = ref(null);

const fetchStoreData = ()=>{
  storeLoading.value= true
  registeredFirms.value = null

  store.dispatch('fetchList', {url:'organizations/statistics'})
      .then((resp)=>{
        registeredFirms.value = resp.data
        storeLoading.value= false
      })
      .catch(err=>{
        storeLoading.value= false
      })
}

const movesPlotLoading = ref(false)
const movePlotData = ref([])
const movesPerMonth = (year)=>{
  movesPlotLoading.value= true
  movePlotData.value = []

  store.dispatch('postData', {url:`moves-per-month/${year}`, })
      .then((resp)=>{
        movePlotData.value = resp.data
        movesPlotLoading.value= false
      })
      .catch(err=>{
        movesPlotLoading.value= false
      })
}

const moveLoading = ref(false)
const registeredMoves = ref(null)

const fetchMoveData = ()=>{
  moveLoading.value= true
  registeredMoves.value = null

  store.dispatch('fetchList', {url:'moves/count'})
      .then((resp)=>{
        registeredMoves.value = resp.data?.moveCount
        moveLoading.value= false
      })
      .catch(err=>{
        moveLoading.value= false
      })
}

const actions = ref('')
const performAction = ()=>{
  if (actions.value !== ''){
    router.push({name: actions.value})
  }
}

// LEADS
const leadLoading = ref(false)

const registeredLeads = ref(null)

const fetchLeadData = ()=>{
  leadLoading.value= true
  registeredLeads.value = null

  store.dispatch('fetchList', {url:'lead-count'})
      .then((resp)=>{
        registeredLeads.value = resp.data
        leadLoading.value= false
      })
      .catch(err=>{
        leadLoading.value= false
      })
}

const movesData = ref( [
  { "month": 1, "count": 15 },
  { "month": 2, "count": 20 },
  { "month": 3, "count": 25 },
  { "month": 4, "count": 0 },
  { "month": 5, "count": 10 },
  { "month": 6, "count": 5 },
  { "month": 7, "count": 30 },
  { "month": 8, "count": 0 },
  { "month": 9, "count": 12 },
  { "month": 10, "count": 18 },
  { "month": 11, "count": 22 },
  { "month": 12, "count": 30 }
])

// USERS
const userLoading = ref(false)
const registeredUsers = ref(null)

onMounted(()=>{
  fetchOnMount()
})

const fetchOnMount = ()=>{
  fetchStoreData()
}

watch(() => router.currentRoute, () => {
  fetchOnMount()
}, { deep: true })

</script>

<template>
  <div class="flex flex-col gap-4 h-full w-full pb-4 overflow-y-auto">
<!--    <BaseDialog/>-->

    <router-view/>

    <h1 class="font-bold text-2xl my-2">
      Hello, {{activeUser?.first_name}}
    </h1>

    <div class="flex flex-wrap gap-4 hidden">
      <el-button size="large" type="primary" :icon="Plus">Invoice(s)</el-button>
    </div>


<!--    Cards-->
    <div class="flex flex-wrap gap-x-4 gap-y-4 items-start w-full md:w-full md:mx-auto rounded-md">

      <!--      firm   -->
      <DisplayCard
          :count="registeredFirms?.organization_count"
          content="firms registered"
          :action-routes="[
                       {value: 'register-firm', roles:['admin'], label:'Register Firm'},
                       {value: 'partial-list-firm', roles:['admin', 'organization_owner'], label:'View Firms'},
                       ]"
          text-color="text-green-500"
          bg-color="bg-green-200"
          show-actions>
        <template #icon>
          <BaseLoader v-if="storeLoading" hide-text/>
          <shop v-else class="h-12 w-12"/>
        </template>
      </DisplayCard>

      <!--      users   -->
      <DisplayCard text-color="text-purple-500"
                   content="system users"
                   :count="registeredFirms?.user_count"
                   :loading="storeLoading"
                   :action-routes="[
                       {value: 'partial-user-registration', roles:['admin', 'organization_manager'], label:'Register User'},
                       {value: 'employees', roles:['admin', 'organization_manager'], label:'View Users'}
                       ]"
                   bg-color="bg-purple-200" show-actions>
        <template #icon>
          <BaseLoader v-if="userLoading" hide-text/>
          <UserFilled v-else class="h-12 w-12"/>
        </template>
      </DisplayCard>

    </div>

    <h1 class="text-lg font-semibold hidden">Moves Per Month</h1>

    <div class="flex flex-col gap-4 h-full w-full pr-4">


      <div class="pb-4 w-full rounded-md border hidden">
        <GrowthChart :chartData="movesData" class="md-w-[400px]"/>
      </div>
    </div>

  </div>
</template>

<style scoped>
.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>