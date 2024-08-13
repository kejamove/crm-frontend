<template>

  <BaseDialog >
    <template #title>
      Create Move
    </template>

    <template #content>
      <el-form
          ref="ruleFormRef"
          :model="form"
          :rules="rules"
          class="w-full flex flex-col gap-4"
          label-position="top"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
          <el-form-item label="Customer Name" prop="consumer_name"
                        :rules="[
            {
              required: true,
              message: 'Please input a customer name',
              trigger: 'blur',
            }
         ]"
          >
            <el-input
                v-model="form.consumer_name"
                placeholder="firm name"
                size="large"
            />
          </el-form-item>

          <el-form-item label="Corporate Name" prop="corporate_name"
                        :rules="[
            {
              required: true,
              message: 'Please input a corporate name',
              trigger: 'blur',
            }
         ]"
          >
            <el-input
                v-model="form.corporate_name"
                placeholder="corporate name"
                size="large"
            />
          </el-form-item>

          <el-form-item label="Client Email" prop="client_email"
                        :rules="[
            {
              required: true,
              message: 'Please input a valid client email',
              trigger: 'blur',
            }
         ]"
          >
            <el-input
                v-model="form.client_email"
                placeholder="client email"
                size="large"
                type="email"
            />
          </el-form-item>

          <el-form-item label="Relocating From" prop="moving_from"
                        :rules="[
            {
              required: true,
              message: 'Please input the source location',
              trigger: 'blur',
            }
         ]"
          >
            <el-input
                v-model="form.moving_from"
                :prefix-icon="Location"
                placeholder="From Location eg Kitisuru Nairobi"
                size="large"
            />
          </el-form-item>

          <el-form-item label="Relocating To" prop="moving_to"
                        :rules="[
            {
              required: true,
              message: 'Please input the destination location',
              trigger: 'blur',
            }
         ]"
          >
            <el-input
                v-model="form.moving_to"
                :prefix-icon="Location"
                placeholder="To Location eg Kinangop"
                size="large"
            />
          </el-form-item>

          <el-form-item label="Invoiced Amount" prop="invoiced_amount"
                        :rules="[
            {
              required: true,
              message: 'Please input the invoiced amount',
              trigger: 'blur',
            }
         ]"
          >
            <el-input-number
                v-model="form.invoiced_amount"
                :prefix-icon="Location"
                placeholder="4000"
                controls-position="right"
                size="large"
                :step="500"
            />
          </el-form-item>

          <el-form-item label="Move Notes" prop="notes"
                        :rules="[
            {
              required: false,
              message: 'Please input the destination location',
              trigger: 'blur',
              help: 'dddd'
            }
         ]"
          >
            <el-input
                v-model="form.notes"
                placeholder="Move notes"
                type="textarea"
                size="large"
            />
          </el-form-item>

          <el-form-item label="Move Stage" prop="move_stage"
                        :rules="[
            {
              required: true,
              message: 'Please input the move stage',
              trigger: 'blur',
            }
         ]"
          >
            <el-select
                v-model="form.move_stage"
                placeholder="contacted"
                size="large"
            >
              <el-option v-for="move in move_stages" :label="move.label" :value="move.value"></el-option>

            </el-select>
          </el-form-item>

          <el-form-item label="Lead Source" prop="lead_source"
                        :rules="[
            {
              required: true,
              message: 'Please input the lead source',
              trigger: 'blur',
            }
         ]"
          >
            <el-select
                v-model="form.lead_source"
                placeholder="contacted"
                size="large"
            >
              <el-option v-for="lead in lead_sources" :label="lead.label" :value="lead.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Branch" prop="branch_id"
                        :rules="[
            {
              required: true,
              message: 'Please input the Branch',
              trigger: 'blur',
            }
         ]"
          >
            <el-select
                v-model="form.branch_id"
                placeholder="branch"
                @focus="fetchBranches"
                @change="fetchSalesRep"
                :loading="branchLoading"
                size="large"
            >
              <template #loading>
                <BaseLoader/>
              </template>
              <el-option
                  v-for="item in registeredBranches"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="Sales Representative" prop="sales_representative"
                        v-if="registeredSalesReps.length > 0"
                        :rules="[
                          {
                            required: true,
                            message: 'Please input the Sales Representative',
                            trigger: 'blur',
                          }
                       ]"
          >
            <el-select
                v-model="form.sales_representative"
                :loading="salesRepLoading"
                placeholder="contacted"
                size="large"
            >
              <template #loading>
                <BaseLoader/>
              </template>
              <el-option
                  v-for="item in registeredSalesReps"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>

        </div>

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
import { reactive, ref, watch } from "vue";
import {ElNotification, FormInstance, FormRules} from "element-plus";
import store from "@/store";
import router from "@/router"
import {House, Location} from "@element-plus/icons-vue";
import BaseDialog from "@/components/base/BaseDialog.vue";
import BaseLoader from "@/components/base/BaseLoader.vue";
const loading = ref(false);
const form = reactive({
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
      store
          .dispatch("postData", {
            url: "moves",
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

const registeredBranches = ref([])
const branchLoading = ref(false)

const fetchBranches = ()=>{
  branchLoading.value= true
  registeredBranches.value = []

  if (form.hasOwnProperty('sales_representative')) {
    delete form.sales_representative;
  }

  store.dispatch('fetchList', {url:'branches'})
      .then((resp)=>{
        resp.data.map((store)=>{
          registeredBranches.value.push({
            'label': store.name,
            'value': store.id,
          })
        })
        branchLoading.value= false
      })
      .catch(err=>{
        branchLoading.value= false
      })
}

const move_stages = ref([
  {label: 'new lead', value :'new_lead' },
  {label: 'contacted', value : 'contacted'},
  {label: 'proposal', value :'proposal' },
  {label: 'negotiations started', value : 'negotiations_started'},
  {label: 'won', value : 'won'},
  {label: 'lost', value : 'lost'},
])

const lead_sources = ref([
  {label: 'referral', value :'referral' },
  {label: 'web', value : 'offline_marketing'},
  {label: 'offline marketing', value :'offline_marketing' },
  {label: 'social media', value : 'social_media'},
  {label: 'repeat client', value : 'repeat_client'},
])

const registeredSalesReps = ref([])
const salesRepLoading = ref(false)

const fetchSalesRep = ()=>{
  salesRepLoading.value= true
  registeredSalesReps.value = []

  store.dispatch('fetchSingleItem', {url:'users/branch', id: form.branch_id})
      .then((resp)=>{
        console.log(resp)
        resp.data.map((user)=>{
          registeredSalesReps.value.push({
            'label': `${user.first_name} ${user.last_name}`,
            'value': user.id,
          })
        })
        salesRepLoading.value= false
      })
      .catch(err=>{
        salesRepLoading.value= false
      })
}

// watch(form.value?.branch, fetchSalesRep, { immediate: true });


</script>

<style scoped></style>