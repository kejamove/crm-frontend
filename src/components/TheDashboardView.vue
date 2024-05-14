<script setup>

import {ref} from "vue"
import TheSideNav from "@/components/TheSideNav.vue";
import { UserFilled} from "@element-plus/icons-vue";
import {useStore} from "vuex";
import {deleteLocalStorageInformation} from "@/utility/functions.js";
import {useRouter} from "vue-router";
const store = useStore()
const router = useRouter()

const logout = ()=>{
  deleteLocalStorageInformation()
  router.replace({name:'login'})
}
const authData = JSON.parse(localStorage.getItem("authData"));

</script>

<template>
  <div class="h-full min-w-screen max-w-screen-md" style="max-width: 100vw">

  <div class=" flex flex-col  min-w-full  h-full items-center">
      <div class="h-[70px] border-b w-full flex items-center justify-end gap-4 px-4">
        <div class="h-[70px] md:flex items-center border-b hidden ">
          <el-button class="w-[40px] bg-amber-600"
                     @click="store.state.sideNavCollapse = !store.state.sideNavCollapse">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
            </svg>
          </el-button>
        </div>

        <div class="border-b h-[70px]  flex items-center w-full text-center text-2xl font-bold text-[#fc7c04]">
          <!--      <img class="" src="@/assets/Kejamove_Logo1x.png">-->
          KEJA<span class="text-gray-800">MOVE</span> <span class="mx-2 text-gray-500 italic hidden">crm</span>

        </div>


        <el-popover
            placement="bottom"
            title="Profile"
            :width="200"
            trigger="click"
            content="this is content, this is content, this is content"
        >
          <template #reference>
<!--            <div size="default" class="cursor-pointer font-extrabold flex gap-2 h-12 px-2  w-fit rounded text-white items-center justify-center"  >-->
<!--              <span>{{authData?.user?.first_name[0]}}</span> <span>{{authData?.user?.last_name[0]}}</span>-->
<!--            </div>-->
            <ElButton size="large" style="background-color: #fc7c04; color:white; font-weight: bold;" class="text-white font-bold">
              <span>{{authData?.user?.first_name[0]}}</span> <span>{{authData?.user?.last_name[0]}}</span>
            </ElButton>
          </template>

          <template #default>
            <div class="w-full border-t flex flex-col gap-2 py-2">
              <div class="flex flex-col p-2 bg-gray-100 capitalize items-center justify-center hover:bg-gray-200 cursor-pointer rounded-md">
                <p class="w-full">
                  {{authData?.user?.first_name}} {{authData?.user?.last_name}}

                </p>
                <p class="w-full" >
                  {{authData?.user?.phone_number_full}}
                </p>
              </div>
              <button
                  @click="logout"
                  class="w-full p-3 h-10 rounded-md flex items-center justify-center gap-2 hover:text-lg bg-red-500 text-white">
                logout

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
              </button>
            </div>
          </template>
        </el-popover>

        <div class="sm:flex items-center border-b md:hidden ">
          <el-button class="w-[40px] bg-amber-600" size="large"
                     @click="store.state.ShowMobileMenu = !store.state.ShowMobileMenu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
            </svg>
          </el-button>
        </div>

      </div>

      <div class="flex h-full w-full">
        <div class="hidden md:block">
          <TheSideNav/>
        </div>

        <div class="flex-1 pl-4 bg-gray-50 overflow-hidden">
          <router-view/>
        </div>

      </div>
    </div>
    <TheSideNav v-if="store.state.ShowMobileMenu"/>

  </div>
</template>

<style scoped>

</style>