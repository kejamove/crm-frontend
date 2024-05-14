<script lang="ts" setup>
import { ref } from 'vue'
import {useStore} from "vuex";
import AdminLinks from "@/components/routerLinks/AdminLinks.vue";
import StoreOwnerLinks from "@/components/routerLinks/StoreOwnerLinks.vue";
import TheMobileMenu from "@/components/TheMobileMenu.vue";
import {useRouter} from "vue-router";

const store = useStore()
const router = useRouter()

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}

const authData = JSON.parse(localStorage.getItem("authData"));

const navigateToSelectedPage = (index)=>{
  router.push({name: index})
}

</script>

<template>

  <div class="hidden md:flex flex-col gap-4 w-fit h-full border-r" >

<!--
        v-if="authData?.user?.user_type === 'admin'"
-->
    <el-menu
        default-active="1"
        class="el-menu-vertical-demo "
        style="border: none;"
        :collapse="store.state.sideNavCollapse"
        @open="handleOpen"
        @close="handleClose"
        @select="navigateToSelectedPage"
    >
      <AdminLinks/>
    </el-menu>


    <el-menu
        default-active="1"
        v-if="authData?.user?.user_type === 'store_owner'"
        class="el-menu-vertical-demo "
        style="border: none;"
        :collapse="store.state.sideNavCollapse"
        @open="handleOpen"
        @close="handleClose"
        @select="navigateToSelectedPage"
    >
      <StoreOwnerLinks/>
    </el-menu>

  </div>

  <!--    MOBILE NAV -->
  <div class="sm:flex md:hidden">
    <TheMobileMenu>
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo "
          style="border: none;"
          :collapse="!store.state.sideNavCollapse"
          @open="handleOpen"
          @close="handleClose"
      >
        <AdminLinks/>
      </el-menu>

      <el-menu
          default-active="1"
          v-if="authData?.user?.user_type === 'store_owner'"
          class="el-menu-vertical-demo "
          style="border: none;"
          :collapse="!store.state.sideNavCollapse"
          @open="handleOpen"
          @close="handleClose"
      >
        <StoreOwnerLinks/>
      </el-menu>
    </TheMobileMenu>

  </div>
</template>



<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>