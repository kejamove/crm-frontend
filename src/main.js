import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import store from "./store/index.js";
import {deleteLocalStorageInformation} from "@/utility/functions.js";
import api from "@/utility/api.js";
import Swal from "sweetalert2";
import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/reset.css';

api.interceptors.request.use((config) => {
    const authData = JSON.parse(localStorage.getItem("authData"));

    if (authData?.token) {
        config.headers.Authorization = authData?.token
            ? "Bearer " + authData?.token
            : "";//else
    }
    return config;

});
api.interceptors.response.use(undefined, function (err) {
    return new Promise(function () {
        console.log('status', err.response.status)
        if (err.response.status === 401) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text:'Session Expired',
                timer: 3000,
            });
            deleteLocalStorageInformation()

            router.push({name : "login"});

        } else if (err.response.status === 403) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: '<p class="text-red-400">Permission Denied </p>',
                timer: 3000,
            });
        }
        throw err;
    });
})


const app = createApp(App);
app.use(router)
app.use(store)
app.mount('#app')

