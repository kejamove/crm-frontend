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
        <el-switch
            v-model="clientType"
            class="mb-2"
            active-text="Client"
            inactive-text="Corporate"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
          <el-form-item
              v-if="clientType"
              label="Client Name" prop="consumer_name"
                        :rules="[
            {
              required: true,
              message: 'Please input a client name',
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

          <el-form-item
              v-if="!clientType"

              label="Corporate Name" prop="corporate_name"
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
          <el-form-item label="Client Phone Number" prop="client_phone_number"
                        :rules="[
            {
              required: true,
              message: 'Please input a valid phone number',
              trigger: 'blur',
            }
         ]"
          >
            <el-input
                v-model="form.client_phone_number"
                placeholder="client email"
                size="large"
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

          <el-form-item label="Expected Move Date" prop="expected_move_date"
                        :rules="[
              {
                  required: true,
                  message: 'Please select the expected move date',
                  trigger: 'change',
              }
          ]">
            <el-date-picker
                v-model="form.expected_move_date"
                type="date"
                placeholder="Select date"
                size="large"
            ></el-date-picker>
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

          <el-form-item label="Move Notes/ Important Advice" prop="notes"
                        :rules="[
            {
              required: true,
              message: 'Please input the notes',
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
          <el-form-item label="Move Remarks" prop="remarks"
                        :rules="[
            {
              required: true,
              message: 'Please input your remarks',
              trigger: 'blur',
              help: 'dddd'
            }
         ]"
          >
            <el-input
                v-model="form.remarks"
                placeholder="Move notes"
                type="textarea"
                size="large"
            />
          </el-form-item>
          <el-form-item label="Move Cbm" prop="move_cbm"
                        :rules="[
            {
              required: true,
              message: 'Please input the move cbm',
              trigger: 'blur',
              help: 'dddd'
            }
         ]"
          >
            <el-input
                v-model="form.move_cbm"
                placeholder="Move cbm"
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



          <el-form-item label="Branch" prop="branch"
              :rules="[
            {
              required: true,
              message: 'Please input the Branch',
              trigger: 'blur',
            }
         ]"
          >
            <el-select
                v-model="form.branch"
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
                        v-if="userType === 'admin' || userType === 'branch_manager' || userType === 'organization_manager'"
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
                @focus="fetchSalesRep"
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
import { reactive, ref, onMounted } from "vue";
import {ElNotification, FormInstance, FormRules} from "element-plus";
import store from "@/store";
import router from "@/router"
import {House, Location} from "@element-plus/icons-vue";
import BaseDialog from "@/components/base/BaseDialog.vue";
import BaseLoader from "@/components/base/BaseLoader.vue";
import { useRoute } from "vue-router";
const loading = ref(false);
const userType = JSON.parse(localStorage.getItem("authData"))?.user?.role;
const form = reactive({
  });

const clientType = ref(true)

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
      if (route.name !== 'edit-move'){
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
      }else {
        store
            .dispatch("putData", {
              url: "moves",
              data: form,
              id:route.params.id
            })
            .then((resp) => {
              registerLoading.value = false;
              router.go(-1)
            })
            .catch((err)=>{
              registerLoading.value = false;
            })
        ;
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
  {label: 'New Lead', value :'new_lead' },
  {label: 'Contacted', value : 'contacted'},
  {label: 'Survey Scheduled/ Online Quote Given', value : 'survey_scheduled'},
  {label: 'Proposal Sent/ Manual Quote Sent', value :'proposal_sent' },
  {label: 'Negotiations Started', value : 'negotiations_started'},
  {label: 'Won', value : 'won'},
  {label: 'Lost', value : 'lost'},
])

const lead_sources = ref([
  {label: 'website', value : 'website'},
  {label: 'offline marketing', value :'offline_marketing' },
  {label: 'social media', value : 'social_media'},
  {label: 'repeat client', value : 'repeat_client'},
])

const registeredSalesReps = ref([])
const salesRepLoading = ref(false)

const fetchSalesRep = ()=>{
  salesRepLoading.value= true
  registeredSalesReps.value = []

  store.dispatch('fetchList', {url:`users?branch=${form.branch}`})
      .then((resp)=>{
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

const route = useRoute()

const getMoves = () => {
  fetchBranches()
  if (route.name === 'edit-move') {
    store.dispatch('fetchSingleItem', { url: 'moves', id: route.params.id }).then((res) => {
      Object.assign(form, res.data);
      delete form.sales_representative.sales_representative;
      form.sales_representative = res.data.sales_representative.id;
      form.expected_move_date = res.data.expected_move_date;
    });
  }
}

// watch(form.value?.branch, fetchSalesRep, { immediate: true });
onMounted(()=>{
  getMoves()
})

</script>

<style scoped></style>