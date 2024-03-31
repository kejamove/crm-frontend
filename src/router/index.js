import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/view/LoginView.vue"
import RegisterView from "@/views/auth/view/RegisterView.vue"
const routes = [
  {
    name:'register',
    path: '/register',
    component: RegisterView
  },
  {
    name:'login',
    path: '/',
    component: LoginView
  },


]

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;