<template>
  <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      class="w-full flex flex-col gap-4 h-full"
      label-position="top"
  >
    <div class="flex gap-2 items-center">
      <h1 class="font-bold text-2xl text-blue-500">Setup Firm Email</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
      <el-form-item label="Email Host" prop="host" show-message message="message"
                    :rules="[
            {
              required: true,
              message: 'Please input host address',
              trigger: 'blur',
            }
         ]"

      >
        <el-input
            v-model="form.host"
            :prefix-icon="UserIcon"
            placeholder="mail.keja.com"
            size="large"
            help='Please enter a valid email address'

        />
      </el-form-item>
      <el-form-item label="Mailer" prop="mailer" show-message message="message"
                    :rules="[
            {
              required: true,
              message: 'Please input your mailer',
              trigger: 'blur',
            }
         ]"

      >
        <el-input
            v-model="form.mailer"
            :prefix-icon="UserIcon"
            placeholder="smtp"
            size="large"

        />
      </el-form-item>
      <el-form-item label="Port" prop="port"
                    :rules="[
            {
              required: true,
              message: 'Please input port',
              trigger: 'blur',
            }
         ]"
      >
        <el-input
            v-model="form.port"
            :prefix-icon="UserIcon"
            placeholder="465"
            size="large"
        />
      </el-form-item>
      <el-form-item label="Username" prop="username"
                    :rules="[
            {
              required: true,
              message: 'Please input username',
              trigger: 'blur',
            }
         ]"
      >
        <el-input
            v-model="form.username"
            :prefix-icon="UserIcon"
            placeholder="email@keja.com"
            size="large"
        />
      </el-form-item>
      <el-form-item label="Password" prop="password"
                    :rules="[
            {
              required: true,
              message: 'Please input password',
              trigger: 'blur',
            }
         ]"
      >
        <el-input
            v-model="form.password"
            :prefix-icon="UserIcon"
            placeholder="password"
            size="large"
        />
      </el-form-item>
      <el-form-item label="Encryption" prop="encryption"
                    :rules="[
            {
              required: true,
              message: 'Please input encryption',
              trigger: 'blur',
            }
         ]"
      >
        <el-input
            v-model="form.encryption"
            :prefix-icon="UserIcon"
            placeholder="ssl"
            size="large"
        />
      </el-form-item>
      <el-form-item label="Email" prop="from_address"
                    :rules="[
            {
              required: true,
              message: 'Please input email address',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: 'blur',
            },
         ]"
      >
        <el-input
            v-model="form.from_address"
            :prefix-icon="UserIcon"
            placeholder="email"
            size="large"
        />
      </el-form-item>
      <el-form-item label="From Name" prop="from_name"
                    :rules="[
            {
              required: true,
              message: 'Please input from name',
              trigger: 'blur',
            },
         ]"
      >
        <el-input
            v-model="form.from_name"
            :prefix-icon="UserIcon"
            placeholder="KEJA CRM"
            size="large"
        />
      </el-form-item>
    </div>

    <div class="flex w-full ">
      <el-button
          :loading="loginLoading"
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
    <div class="text-sm hidden">
      <span class="text-gray-400"> Don't have an Account ? </span>
      <router-link :to="{name:'register'}" class="text-blue-400 hover:text-blue-500 hover:font-bold"> Register </router-link>
    </div>

  </el-form>

</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/solid";
import {ElNotification, FormInstance, FormRules} from "element-plus";
import store from "@/store/index";
import router from "@/router/index"
import Swal from "sweetalert2";
const loading = ref(false);

const form = reactive({
});

const isEdit = ref(false)

const loginLoading = ref(false);

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

/**
 * IF a firm is already configured then get its data and fill the form
 */
const getMailData = ()=>{
  let id = router?.currentRoute?._value?.params?.id;
  store.dispatch('fetchList', {url: `list-email-setup?firm=${id}`}).then(res=>{
    Object.assign(form, res.data[0][0]);
    if (res.data[0].length > 0) {
      isEdit.value = true
    }
  })
}

const submitForm = async (formEl: FormInstance | undefined) => {
  loginLoading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (!isEdit.value){
        /**
         * POST
         */
        let firmId = router?.currentRoute?._value?.params?.id;
        store
            .dispatch("postData", {
              url: "setup-email",
              data: {...form, firm: `${firmId}`},
            })
            .then((resp) => {
              loginLoading.value = false;
            })
            .catch((err)=>{
              loginLoading.value = false;
            });
      }else {
        /**
         * EDIT
         */
        store
            .dispatch("putData", {
              url: "setup-email",
              data: {...form, firm: form.firm ? form.firm.toString() : ''},
              id : form.id
            })
            .then((resp) => {
              loginLoading.value = false;
            })
            .catch((err)=>{
              loginLoading.value = false;
            });
      }

    } else {
      loginLoading.value = false;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: '<p class="text-red-400">Fill All required Fields</p>',
        timer: 4000,
      });
    }
    loading.value = false;
  });
};

onMounted(()=>{
  // getMailData()
})

</script>

<style scoped></style>