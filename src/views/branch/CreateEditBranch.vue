<template>

  <BaseDialog>
    <template #title>
      Create Branch
    </template>

    <template #content>
      <el-form
          ref="ruleFormRef"
          :model="form"
          :rules="rules"
          class="w-full flex flex-col gap-4"
          label-position="top"
      >

        <el-form-item label="Branch Name" prop="name"
                      :rules="[
            {
              required: true,
              message: 'Please input a branch name',
              trigger: 'blur',
            }
         ]"
        >
          <el-input
              v-model="form.name"
              :prefix-icon="House"
              placeholder="branch name"
              size="large"
          />
        </el-form-item>

        <el-form-item label="Branch Location" prop="location"
                      :rules="[
            {
              required: true,
              message: 'Please input the branch location',
              trigger: 'blur',
            }
         ]"
        >
          <el-input
              v-model="form.location"
              :prefix-icon="Location"
              placeholder="Branch Location eg Kitisuru Nairobi"
              size="large"
          />
        </el-form-item>

        <el-form-item label="Firm" prop="organization" class="w-full">
          <el-select
              v-model="form.organization"
              clearable
              @focus="fetchFirms"
              :loading="storeLoading"
              placeholder="Firm To Which a branch belongs"
              size="large"
          >
            <template #loading>
              <BaseLoader/>
            </template>
            <el-option
                v-for="item in firmData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
        </el-form-item>
<!--        {{firmData}}-->

        <!--            <el-input-->
        <div class="flex w-full ">
          <el-button
              :loading="registerLoading"
              class="w-fit "
              size="large"
              style="border-radius: 4px"
              type="primary"
              @click="submitForm(ruleFormRef)"
          >
            <!--                @click="submitForm(loginFormRef)"-->

            Submit
          </el-button>
        </div>



      </el-form>

    </template>
  </BaseDialog>

</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import {ElNotification, FormInstance, FormRules} from "element-plus";
import store from "@/store";
import router from "@/router"
import {House, Location} from "@element-plus/icons-vue";
import BaseDialog from "@/components/base/BaseDialog.vue";
import BaseLoader from "@/components/base/BaseLoader.vue";
const loading = ref(false);
const form = reactive({
  is_active:true
});

/**
 * To register a branch you need to be a superuser or firm owner
 */
const userType = JSON.parse(localStorage.getItem("authData"))?.user?.role;
const firmData = ref([]);
const storeLoading = ref(false);
const fetchFirms = ()=>{
  storeLoading.value = true;

  if (userType === 'admin' || userType === 'organization_manager') {
    store.dispatch('fetchList', { url:'organizations'}).then(res=>{
      firmData.value = res.data;
      branches.value = res.data?.branches;
      storeLoading.value = false;
    }).catch(err=>{
      storeLoading.value = false;
    })
  }
   storeLoading.value = false
}

const registerLoading = ref(false);

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
});
const submitForm = async (formEl: FormInstance | undefined) => {
  registerLoading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    console.log(fields,'fields')
    if (valid) {
      store
          .dispatch("postData", {
            url: "branches",
            data: form
          })
          .then((resp) => {
            registerLoading.value = false;
            router.go(-1)
          })
          .catch((err)=>{
            registerLoading.value = false;
          })
      ;
    } else {
      registerLoading.value = false;
      ElNotification({
        title: 'Error',
        type: "error",
        position: "top-right",
        message: 'All Fields are required'
      })
    }
    loading.value = false;
  });
};

</script>

<style scoped></style>