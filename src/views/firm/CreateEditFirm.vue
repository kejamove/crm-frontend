<template>

  <BaseDialog>
    <template #title>
      Create Firm
    </template>

    <template #content>
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
        <el-form-item label="Firm Website" prop="website"
                      :rules="[
            {
              required: true,
              message: 'Please input your website link',
              trigger: 'blur',
            }
         ]"
        >
          <el-input
              v-model="form.website"
              :prefix-icon="Place"
              placeholder="website"
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
        <el-form-item label="Invoice Instructions" prop="invoice_instructions" :rules="[{ required: true, message: 'Please input invoice instructions', trigger: 'blur' }]">
          <div class="flex flex-col w-full">
            <QuillEditor ref="quillEditorRef" :options="editorOptions" @text-change="onEditorInput" v-model="form.invoice_instructions"/>
          </div>
        </el-form-item>

        <el-button v-if="!showMailConfiguration"
                   @click="showMailConfiguration = true"
                   plain
                   size="large"
                   class="bg-gray-200">
          <span class="mr-2">Show Mail Configuration</span>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>
        </el-button>

        <el-button v-if="showMailConfiguration"
                   @click="showMailConfiguration = false"
                   plain size="large" class="el-icon--right bg-gray-200">
          <span class="mr-2">Hide Mail Configuration</span>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
          </svg>
        </el-button>

        <div v-if="showMailConfiguration" class="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
          <el-form-item label="Smtp Server" prop="smtp_server" show-message message="message"
                        :rules="[]"

          >
            <el-input
                v-model="form.smtp_server"
                :prefix-icon="UserIcon"
                placeholder="mail.keja.com || gmail.com"
                size="large"
                help='Please input your smtp server'

            />
          </el-form-item>
          <el-form-item label="Smtp Port" prop="smtp_port"
                        :rules="[]"
          >
            <el-input
                v-model="form.smtp_port"
                :prefix-icon="UserIcon"
                placeholder="465"
                size="large"
            />
          </el-form-item>
          <el-form-item label="Email" prop="email" show-message message="message"
                        :rules="[
            {
              type: 'email',
              message: 'input a valid email'
            }
         ]"

          >
            <el-input
                v-model="form.email"
                :prefix-icon="UserIcon"
                placeholder="smtp"
                size="large"

            />
          </el-form-item>
          <el-form-item label="Smtp Username" prop="smtp_username"
                        :rules="[]"
          >
            <el-input
                v-model="form.smtp_username"
                :prefix-icon="UserIcon"
                placeholder="email@keja.com"
                size="large"
            />
          </el-form-item>
          <el-form-item label="Tls Encryption"  prop="tls"
                        :rules="[]"
          >
            <el-switch @change="validateEncryptionTls" v-model="form.use_tls"></el-switch>
          </el-form-item>
          <el-form-item label="Ssl Encryption"  prop="ssl"
                        :rules="[]"
          >
            <el-switch @change="validateEncryptionSSl" v-model="form.use_ssl"></el-switch>
          </el-form-item>
          <el-form-item label="Smtp Password" prop="smtp_password"
                                                 :rules="[]"
        >
          <el-input
              v-model="form.smtp_password"
              :prefix-icon="UserIcon"
              placeholder="password"
              size="large"
          />
        </el-form-item>
        </div>
        <div class="flex w-full ">
          <el-button
              :loading="submitLoading"
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
import {inject, onMounted, reactive, ref, watch} from "vue";
import {ElNotification, FormInstance, FormRules} from "element-plus";
import store from "@/store";
import {House, Location, Place} from "@element-plus/icons-vue";
import BaseDialog from "@/components/base/BaseDialog.vue";
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {useRoute} from "vue-router"

const loading = ref(false);
const route = useRoute()
let form = ref({
  invoice_instructions:'here'
});

const quillEditorRef = ref(null)

const cleanHTML = (html) => {
  const cleanedHTML = html
      .replace(/<[^\/>][^>]*>(\s|&nbsp;)*<\/[^>]+>/g, '')
      .replace(/<[^\/>][^>]*>\s*<\/[^>]+>/g, '')
      .replace(/<[^>]+><\/[^>]+>/g, '')
      .replace(/<br\s*\/?>/g, '');

  const trimmedHTML = cleanedHTML.trim();
  return trimmedHTML === '<p><br></p>' || trimmedHTML === '' ? '' : trimmedHTML;
};

const editorOptions = {
  theme: 'bubble',
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: ['times-new-roman', 'serif'] }],
      ['italic', 'underline'],
      ['link', 'image'],
      [{ list: 'ordered'}, { list: 'bullet' }],
    ],
  },
  placeholder: 'Compose your invoice instructions here...', // Placeholder text
};

// Handle text changes in the Quill editor
const onEditorInput = () => {
  let editorContent = quillEditorRef.value?.getHTML(); // Get the HTML content
  editorContent = cleanHTML(editorContent); // Clean up any empty tags
  form.value.invoice_instructions = editorContent; // Update the form field with the cleaned content
  console.log(form.value.invoice_instructions); // Debugging
};

const { pushDataToDatabase, submitLoading } = inject('useLifecycle');

const ruleFormRef = ref<FormInstance>();

const validateEncryptionSSl = () => {
  if (form.value.use_ssl === true) {
    form.value.use_tls = false;
  }if (form.value.use_ssl === false) {
    form.value.use_tls = true;
  }
};

const validateEncryptionTls = () => {
  if (form.value.use_tls === true) {
    form.value.use_ssl = false;
  }if (form.value.use_tls === false) {
    form.value.use_ssl = true;
  }
};

const showMailConfiguration = ref(false);
const rules = reactive<FormRules>({
});

const submitForm = async (formEl: FormInstance | undefined) => {
  submitLoading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    console.log(fields,'fields')
    if (valid) {
      if (route.name == 'create-firm')
      {
        pushDataToDatabase('postData', 'organizations', form)
      }

      if (route.name == 'edit-firm')
      {
        delete form.value.logo
        pushDataToDatabase('putData', 'organizations',form, route?.params?.id)
      }
    } else {
      submitLoading.value = false;
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
    console.log('rer')
    store.dispatch("fetchSingleItem", {url: 'organizations', id: route?.params?.id}).then(
        (res)=>{

          if (res.data?.smtp_server){
            showMailConfiguration.value = true;
          }

          Object.assign(form.value, {...res.data});
          quillEditorRef.value.setHTML(form?.value?.invoice_instructions)
        }
    )
  }
}

onMounted(()=>{
  getFirmData()
})

</script>

<style scoped></style>