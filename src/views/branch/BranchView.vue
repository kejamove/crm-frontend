<template>
  <el-tabs
      v-model="activeTab"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
  >
    <el-tab-pane v-for="item in filteredRoutes"
                 :key="item?.id"
                 :label="item?.label"
                 :name="item?.name">
    </el-tab-pane>
  </el-tabs>
  <router-view/>

</template>

<script lang="ts" setup>
import { ref ,watch, onMounted, computed} from 'vue'
import type { TabsPaneContext } from 'element-plus'
import router from '@/router';
const userType = JSON.parse(localStorage.getItem("authData"))?.user?.user_type;


/**
 * These are to be displayed depending on the user type
 * On mount , the user type is checked to identify the route to redirect to
 * If a user_type does not match the roles , then a route is not shown
 */
const activeTab = ref('first')

const branchRoutes = ref([
    {
      id: 1,
      name: 'branch-analytics',
      label:'Analytics',
      roles: ['super_admin', 'firm_owner', 'branch_manager']
    },
    {
      id: 2,
      name: 'branch-employees',
      label:'Employees',
      roles: [ 'firm_owner', 'branch_manager','super_admin']
    },
])

const filteredRoutes = computed(() => {
  return branchRoutes.value.filter(route => !route.roles || route.roles.includes(userType));
});

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

watch(activeTab, (newVal, oldVal) => {
  console.log(`activeTab changed from ${oldVal} to ${newVal}`);
  router.push({name: newVal})
});


const openAprropriateTabOnMount = ()=>{
  console.log('sss')
  if (userType === 'super_admin' || userType === 'firm_owner' || userType === 'branch_manager' ) {
    activeTab.value = 'branch-analytics';
    router.push({name:'branch-analytics'})
  }
}

onMounted(()=>{
  openAprropriateTabOnMount();
})
</script>

<style>
.demo-tabs > .el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
