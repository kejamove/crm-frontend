  <template>
    <el-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      class="flex flex-col gap-4 w-full h-fit"
      label-position="top"
    >

      <el-form-item label="First Name" prop="first_name">
        <el-input
          v-model="form.first_name"
          :prefix-icon="UserIcon"
          placeholder="first name"
          size="large"
          type="text"
        />
      </el-form-item>

      <el-form-item label="Last Name" prop="last_name">
        <el-input
          v-model="form.last_name"
          :prefix-icon="UserIcon"
          placeholder="last name"
          size="large"
          type="text"
        />
      </el-form-item>
      <el-form-item label="Username" prop="username">
        <el-input
          v-model="form.username"
          :prefix-icon="UserIcon"
          placeholder="username"
          size="large"
          type="text"
        />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input
          v-model="form.email"
          :prefix-icon="FolderOpened"
          placeholder="email"
          size="large"
          type="email"
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
      <el-form-item
          :rules="[
              {
                required: true,
                trigger: 'blur',
                message: 'Please enter password',
              },
              {
                validator: validatePassword
              }
          ]"
          label="Password Confirmation" prop="password_confirmation">
        <el-input
            v-model="form.password_confirmation"
            :prefix-icon="LockClosedIcon"
            placeholder="password"
            show-password
            size="large"
            type="password"
        />
      </el-form-item>
      <el-form-item label="User Type" prop="user_type" class="w-full">
        <el-select
            clearable
            v-model="form.user_type"
            placeholder="Select"
            size="large"
        >
          <el-option
              v-for="item in user_types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Phone Number" prop="phone_local_number" class="w-full"
            :rules="[
              {
                required: true,
                trigger: 'blur',
                message: 'Please enter a valid phone number',
              },
              {
                validator: validatePhoneNumber
              }
          ]"
      >
        <el-input
            v-model="form.phone_local_number"
            style="max-width: 600px"
            placeholder="Please input phone number"
            class="input-with-select"
            type="number"
        >
          <template #prepend>
            <el-select v-model="form.phone_country_code"
                       placeholder="Country Code" style="width: 60px">
              <el-option label="+254" value="+254" />
              <el-option label="+255" value="+255" />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="Firm" prop="firm" class="w-full">
        <el-select
            v-model="form.firm"
            clearable
            @focus="fetchStores"
            :loading="storeLoading"
            placeholder="Firm To Which a user belongs"
            size="large"
        >
          <template #loading>
            <BaseLoader/>
          </template>
          <el-option
              v-for="item in registeredStores"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Branch **Optional" prop="branch" class="w-full" v-if="form.firm">
        <el-select
            v-model="form.branch"
            clearable
            @focus="fetchBranches"
            :loading="branchLoading"
            placeholder="Branch To Which a user belongs"
            size="large"
        >
          <template #loading>
            <BaseLoader/>
          </template>
          <el-option
              v-for="item in registeredBranches"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>

      <div class="flex w-full ">
        <el-button
          :loading="registerUserLoading"
          class="w-fit "
          size="large"
          style="border-radius: 4px"
          type="primary"
          html-type="submit"
          @click="submitForm(ruleForm)"
        >
          Register
        </el-button>
      </div>
      <div class="text-sm hidden">
        <span class="text-gray-400"> Already have an Account ? </span>
        <router-link :to="{name:'login'}" class="text-blue-400 hover:text-blue-500 hover:font-bold">
          Sign In </router-link>
      </div>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref,onMounted } from "vue";
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/solid";
import { FormInstance, FormRules } from "element-plus";
import store from "@/store";
import router from "@/router";
import { FolderOpened } from '@element-plus/icons-vue'
import BaseLoader from "@/components/base/BaseLoader.vue";


const loading = ref(false);
const form = ref({
  username: "",
  password: "",
  first_name: '',
  last_name: '',
  email:''
});

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      trigger: "blur",
      message: "Please enter username",
    },
  ],
  password: {
    required: true,
    trigger: "blur",
    message: "Please enter password",
  },
});
const registerUserLoading = ref(false)
const submitForm = async (formEl: FormInstance | undefined) => {
  registerUserLoading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    console.log(fields,'fields')
    if (valid) {
      store
          .dispatch("postData", {
            url: "register-user",
            data: form.value
          })
          .then((resp) => {
            registerUserLoading.value = false;
            router.go(-1)
          })
          .catch((err)=>{
            registerUserLoading.value = false;
          })
      ;
    } else {
      registerUserLoading.value = false;
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

const user_types = [
  {
    value: 'super_admin',
    label: 'Super Admin',
  },
  {
    value: 'branch_manager',
    label: 'Branch Manager',
  },
  {
    value: 'project_manager',
    label: 'Project Manager',
  },
  {
    value: 'sales',
    label: 'Sales Person',
  },
  {
    value: 'marketing',
    label: 'Marketing Person',
  }
]

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== form.value.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const validatePhoneNumber = (rule, value, callback) => {
  const phoneNumberPattern = /^[0-9]+$/; // Regular expression to match only digits

  if (value.length < 7) {
    callback(new Error('Phone number must be at least 7 characters'));
  } else if (value.length > 11) {
    callback(new Error('Phone number must be no more than 11 characters'));
  } else if (!phoneNumberPattern.test(value)) {
    callback(new Error('Phone number must contain only digits'));
  } else {
    callback();
  }
};

const registeredStores = ref([])
const storeLoading = ref(false)

const fetchStores = ()=>{
  storeLoading.value= true
  registeredStores.value = []

  store.dispatch('fetchList', {url:'list-firms'})
      .then((resp)=>{
        resp.data.map((store)=>{
          registeredStores.value.push({
            'label': store.name,
            'value': store.id,
          })
        })
        storeLoading.value= false
      })
      .catch(err=>{
        storeLoading.value= false
      })
}

const registeredBranches = ref([])
const branchLoading = ref(false)

const fetchBranches = ()=>{
  branchLoading.value= true
  registeredBranches.value = []

  store.dispatch('fetchList', {url:`list-firms/${form.value?.firm}/branches`})
      .then((resp)=>{
        registeredBranches.value = resp.data
        branchLoading.value= false
      })
      .catch(err=>{
        branchLoading.value= false
      })
}

onMounted(()=>{
  // fetchStores()
})

</script>

<style scoped></style>