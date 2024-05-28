import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/view/LoginView.vue"
import RegisterView from "@/views/auth/view/RegisterView.vue"
import TheDashboardView from "@/components/TheDashboardView.vue";
import AdminWelcomeView from "@/views/analytics/AdminWelcomeView.vue";
import CreateEditFirms from "@/views/firm/CreateEditFirm.vue";
import ListFirms from "@/views/firm/ListFirms.vue";
import DialogFirm from "@/views/firm/components/DialogFirm.vue";
import UserCreateEdit from "@/views/users/UserCreateEdit.vue";
import FirmView from "@/views/firm/FirmView.vue";
import FirmList from "@/views/firm/FirmList.vue";
import ListBranches from "@/views/branch/ListBranches.vue";
import CreateEditBranch from "@/views/branch/CreateEditBranch.vue";

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
        path:'welcome',
        component: AdminWelcomeView,
        requiresAuth: true,
        roles: ['admin'],
        children: [
          {
            name:'register-firm',
            path:'register-firm',
            component: CreateEditFirms,
            requiresAuth: true,
            roles: ['admin'],
          },
          {
            name:'partial-list-firm',
            path:'partial-firm',
            component: DialogFirm,
            requiresAuth: true,
            roles: ['super_admin']
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
        name:'firm-list',
        path:'firm-list',
        component: FirmList,
        requiresAuth: true,
        roles: ['super_admin'],
        children: [
          {
            name:'partial-firm-view',
            path:'partial-firm-view/:id',
            component: FirmView,
          },
          {
            name:'create-firm',
            path:'create-firm',
            component: CreateEditFirms,
            requiresAuth: true,
            roles: ['admin'],
          },
        ]
      },
      {
        name:'branch-list',
        path:'branch-list',
        component: ListBranches,
        children: [
          {
            name:'create-branch',
            path:'create-branch',
            component: CreateEditBranch,
          }
        ]
      }



    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;