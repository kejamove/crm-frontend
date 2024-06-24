<template>

  <BaseDialog>
    <template #title>
      Create Firm
    </template>

    <template #content>
      {{form}}
      <el-form
          ref="ruleFormRef"
          :model="form"
          :rules="rules"
          class="w-full flex flex-col gap-4"
          label-position="top"
      >

        <el-form-item label="Firm Name" prop="name"
                      :rules="[
            {
              required: true,
              message: 'Please input a firm name',
              trigger: 'blur',
            }
         ]"
        >
          <el-input
              v-model="form.name"
              :prefix-icon="House"
              placeholder="firm name"
              size="large"
          />
        </el-form-item>

        <el-form-item label="Firm Location" prop="location"
                      :rules="[
            {
              required: true,
              message: 'Please input the firm location',
              trigger: 'blur',
            }
         ]"
        >
          <el-input
              v-model="form.location"
              :prefix-icon="Location"
              placeholder="Firm Location eg Kitisuru Nairobi"
              size="large"
          />
        </el-form-item>

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
import { reactive, ref, onMounted } from "vue";
import {ElNotification, FormInstance, FormRules} from "element-plus";
import store from "@/store";
import router from "@/router"
import {House, Location} from "@element-plus/icons-vue";
import BaseDialog from "@/components/base/BaseDialog.vue";
import {useRoute} from "vue-router"
const loading = ref(false);
const route = useRoute()
let form = reactive({
});


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
      if (route.name == 'create-firm')
      {
        store
            .dispatch("postData", {
              url: "register-firm",
              data: form
            })
            .then((resp) => {
              registerLoading.value = false;
              router.go(-1)
            })
            .catch((err)=>{
              registerLoading.value = false;
            })
      }

      if (route.name == 'edit-firm')
      {
        store
            .dispatch("putData", {
              url: "update-firm",
              id: route?.params?.id,
              data: form
            })
            .then((resp) => {
              registerLoading.value = false;
              // router.go(-1)
            })
            .catch((err)=>{
              registerLoading.value = false;
            })
      }
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

const getFirmData = () => {
  if (route.name == 'edit-firm')
  {
    store.dispatch("fetchSingleItem", {url: 'list-firms', id: route?.params?.id}).then(
        (res)=>{
          Object.assign(form, {
            name: res.data?.name,
            location: res.data?.location
          });
        }
    )
  }
}

onMounted(()=>{
  getFirmData()
})

</script>

<style scoped></style>