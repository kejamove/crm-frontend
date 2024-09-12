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

  store.dispatch('fetchList', {url:'firms/count'})
      .then((resp)=>{
        console.log(resp.data?.firmCount)
        registeredFirms.value = resp.data?.firmCount
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

const fetchUserData = ()=>{
  userLoading.value= true
  registeredUsers.value = null

  store.dispatch('fetchList', {url:'users/count'})
      .then((resp)=>{
        registeredUsers.value = resp.data?.userCount
        userLoading.value= false
      })
      .catch(err=>{
        userLoading.value= false
      })
}

onMounted(()=>{
  fetchOnMount()
})

const fetchOnMount = ()=>{
  fetchStoreData()
  fetchMoveData()
  fetchUserData()
  // fetchLeadData()
}

watch(() => router.currentRoute, () => {
  fetchOnMount()
}, { deep: true })

</script>

<template>
  <div class="flex flex-col gap-8 h-full w-full pb-4 overflow-y-auto">
<!--    <BaseDialog/>-->

    <router-view/>

    <h1 class="font-bold text-2xl my-2">
      Hello, {{activeUser?.first_name}}
    </h1>

    <div class="flex flex-wrap gap-4 hidden">
      <el-button size="large" type="primary" :icon="Plus">Invoice(s)</el-button>
    </div>

<!--    Cards-->
    <div class="flex flex-wrap gap-x-4 gap-y-4 items-start w-full md:w-full md:mx-auto p-2 md:p-4 rounded-md">

      <!--      firm   -->
      <DisplayCard
          :count="registeredFirms"
          content="firms registered"
          :action-routes="[
                       {value: 'register-firm', roles:['super_admin'], label:'Register Firm'},
                       {value: 'partial-list-firm', roles:['super_admin', 'firm_owner'], label:'View Firms'},
                       ]"
          text-color="text-green-500"
          bg-color="bg-green-200"
          show-actions>
        <template #icon>
          <BaseLoader v-if="storeLoading" hide-text/>
          <shop v-else class="h-12 w-12"/>
        </template>
      </DisplayCard>

      <!--      moves   -->
      <DisplayCard
          :count="registeredMoves"
          content="moves made"
          text-color="text-yellow-500" bg-color="bg-yellow-200">
        <template #icon>
          <BaseLoader v-if="moveLoading" hide-text/>

          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-12 w-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
        </template>

        <template #actions>

          <router-link :to="{name: 'register-firm'}">
            <el-button :icon="Plus"/>
          </router-link>

        </template>
      </DisplayCard>

      <!--      leads   -->
      <DisplayCard
          :count="registeredLeads?.data"
          class="hidden"
          content="possible Leads"
          text-color="text-blue-500" bg-color="bg-blue-200">
        <template #icon>
          <BaseLoader v-if="leadLoading" hide-text/>

          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-12 w-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
          </svg>
        </template>

        <template #actions>

          <router-link :to="{name: 'register-firm'}">
            <el-button :icon="Plus"/>
          </router-link>

        </template>
      </DisplayCard>

      <!--      users   -->
      <DisplayCard text-color="text-purple-500"
                   content="system users"
                   :count="registeredUsers"
                   :loading="storeLoading"
                   :action-routes="[
                       {value: 'partial-user-registration', roles:['super_admin', 'firm_owner'], label:'Register User'},
                       {value: 'employees', roles:['super_admin', 'firm_owner'], label:'View Users'}
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