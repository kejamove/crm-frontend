<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    class="w-full flex flex-col gap-4"
    label-position="top"
  >
    <div class="flex gap-2 items-center">
      <h1 class="font-bold text-2xl text-blue-500">Agile UI</h1>
    </div>

    <h2 class="font-bold text-gray-400">Sign In</h2>

    <el-form-item label="Username" prop="username">
      <el-input
        v-model="form.username"
        :prefix-icon="UserIcon"
        placeholder="username"
        size="large"
        type="text"
      />
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input
        v-model="form.password"
        :prefix-icon="LockClosedIcon"
        placeholder="password"
        show-password
        size="large"
        type="password"
      />
    </el-form-item>
    <!--            <el-input-->
    <div class="flex w-full ">
      <el-button
        :loading="loading"
        class="w-fit "
        size="large"
        style="border-radius: 4px"
        type="primary"
        @click="submitForm(ruleFormRef)"
      >
        <!--                @click="submitForm(loginFormRef)"-->

        Login
      </el-button>
    </div>
    <div class="text-sm">
      <span class="text-gray-400"> Don't have an Account ? </span>
      <router-link :to="{name:'register'}" class="text-blue-400 hover:text-blue-500 hover:font-bold"> Register </router-link>
    </div>

  </el-form>

</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/solid";
import {ElNotification, FormInstance, FormRules} from "element-plus";
import store from "@/store/index";
const loading = ref(false);
const form = reactive({
  username: "",
  password: "",
});

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  username:{
    required: true,
    trigger: "blur",
    message: "Please enter username",
  },
  password: {
    required: true,
    trigger: "blur",
    message: "Please enter password",
  }
});
const submitForm = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    console.log(fields,'fields')
    if (valid) {
      store
        .dispatch("postData", {
          url: "token/request",
          data: {
            username: form.username,
            password: form.password,
          },
        })
        .then((resp) => {
          localStorage.setItem("authData", JSON.stringify(resp.data));
          // router.push({ name: "available-job", replace: true });
        });
    } else {
      ElNotification(
        {
          title: `Login Error`,
          type: "warning",
          position: "top-right",
          message: 'Check your credentials and Try again',
        }
      )
    }
    loading.value = false;
  });
};

</script>

<style scoped></style>