import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/view/LoginView.vue"
import RegisterView from "@/views/auth/view/RegisterView.vue"
import TheDashboardView from "@/components/TheDashboardView.vue";
import AdminWelcomeView from "@/views/analytics/AdminWelcomeView.vue";
import CreateEditStore from "@/views/admin/store/CreateEditStore.vue";
import ListStores from "@/views/admin/store/ListStores.vue";
import DialogStore from "@/views/admin/store/components/DialogStore.vue";
import UserCreateEdit from "@/views/admin/users/UserCreateEdit.vue";

const routes = [
  {
    name:'register',
    path: '/register',
    component: RegisterView,
    requiresAuth: true,
    roles: ['admin', 'store_owner']
  },
  {
    name:'login',
    path: '/',
    component: LoginView
  },
  {
    name:'dashboard',
    path:'/dashboard',
    component: TheDashboardView,
    requiresAuth: true,
    roles: ['admin', 'store_owner'],
    children : [
      {
        name:'welcome',
        path:'store',
        component: AdminWelcomeView,
        requiresAuth: true,
        roles: ['admin'],
        children: [
          {
            name:'register-store',
            path:'register-store',
            component: CreateEditStore,
            requiresAuth: true,
            roles: ['admin'],
          },
          {
            name:'partial-list-stores',
            path:'partial-stores',
            component: DialogStore,
            requiresAuth: true,
            roles: ['admin'],
          },
          {
            name:'partial-user-registration',
            path:'partial-user-registration',
            component: UserCreateEdit,
            requiresAuth: true,
            roles: ['admin'],
          },
        ]
      },
      {
        name:'admin-list-stores',
        path:'list-stores',
        component: ListStores,
        requiresAuth: true,
        roles: ['admin'],
      },

    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;