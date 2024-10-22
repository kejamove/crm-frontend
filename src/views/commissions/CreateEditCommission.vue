<template>
  <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      class="w-full flex flex-col gap-4"
      label-position="top"
  >
    <el-skeleton :rows="1" v-if="loader" animated/>
    <el-tag v-else size="large" class="w-fit">
      Commission : {{formatCurrency(store?.state?.commissionData?.commission_to_be_issued)}}
      at {{ store?.state?.commissionData?.commission_percentage }} %
    </el-tag>

    <el-form-item label="Commission Rate" prop="commission_percentage">
      <el-input-number
          v-model="form.commission_percentage"
          :prefix-icon="LockClosedIcon"
          placeholder="rate eg 12 0r 20"
          style="width: 100%"
          min="0"
          max="50"
          size="large"
      />
    </el-form-item>
    <!--            <el-input-->
    <div class="flex w-full ">
      <el-button
          :loading="loginLoading"
          class="w-full"
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

<script lang="ts" setup>
import { reactive, ref, toRaw,onMounted } from "vue";
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/solid";
import {ElNotification, FormInstance, FormRules} from "element-plus";
import store from "@/store/index";
import router from "@/router/index"
import Swal from "sweetalert2";
import {formatCurrency} from "@/utility/functions";

const loading = ref(false);

const props = defineProps({
  move_id : {
    type : Number,
    required: true,
  }
})

const form = reactive({
  move: props.move_id
});


const loginLoading = ref(false);

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  email:{
    required: true,
    trigger: "blur",
    message: "Please enter email",
    type:"email"
  },
  password: {
    required: true,
    trigger: "blur",
    message: "Please enter password",
  }
});
const submitForm = async (formEl: FormInstance | undefined) => {
  loginLoading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const payload = toRaw(form);  // Convert reactive object to plain object
      store.dispatch("postData", {
        url: "commissions",
        data: payload  // Use the plain object here
      })
          .then((resp) => {
            loginLoading.value = false;
            getCommission()
          })
          .catch((err) => {
            loginLoading.value = false;
            // Optionally handle the error here, e.g. raise an error notification
          });
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

const loader = ref(false)
const commissionData = ref(null)


const getCommission = ()=>{
  loader.value = true
  commissionData.value = null
  store.dispatch("fetchList", {url: `commissions/?move=${props.move_id}`}).
      then((res)=>{
        store.state.commissionData = res.data[0]
        commissionData.value = res.data[0]
    loader.value = false
  })
      .catch((err)=>{
        loader.value = false
      })
}
onMounted(()=>{
  getCommission()
})
</script>

<style scoped></style>