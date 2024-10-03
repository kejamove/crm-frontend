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
import BranchView from "@/views/branch/BranchView.vue";
import BranchEmployees from "@/views/branch/components/BranchEmployees.vue";
import BranchAnalytics from "@/views/branch/components/BranchAnalytics.vue";
import Employees from "@/views/branch/components/Employees.vue";
import MoveList from "@/views/moves/MoveList.vue";
import MoveView from "@/views/moves/MoveView.vue";
import CreateEditMove from "@/views/moves/CreateEditMove.vue";
import FirmSetup from "@/views/firm/FirmSetup.vue";

const routes = [
  {
    name:'register',
    path: '/register',
    component: RegisterView,
    requiresAuth: true,
    roles: ['admin', 'store_owner'],
    meta: {
      slug: 'User Registration',
    },
  },
  {
    name:'login',
    path: '/',
    component: LoginView,
    meta: {
      slug: 'Login',
    },
  },
  {
    name:'dashboard',
    path:'/dashboard',
    component: TheDashboardView,
    requiresAuth: true,
    roles: ['admin', 'store_owner'],
    meta: {
      slug: '.',
    },

    children : [
      {
        name:'welcome',
        path:'welcome',
        component: AdminWelcomeView,
        requiresAuth: true,
        roles: ['admin'],
        meta: {
          slug: 'Welcome',
        },

        children: [
          {
            name:'register-firm',
            path:'register-firm',
            component: CreateEditFirms,
            requiresAuth: true,
            roles: ['admin'],
            meta: {
              slug: 'Register Firm',
            },

          },
          {
            name:'partial-list-firm',
            path:'partial-firm',
            component: DialogFirm,
            requiresAuth: true,
            roles: ['super_admin'],
            meta: {
              slug: 'List Firms',
            },

          },

          {
            name:'partial-user-registration',
            path:'partial-user-registration',
            component: UserCreateEdit,
            requiresAuth: true,
            roles: ['admin'],
            meta: {
              slug: 'Register User',
            },

          },
        ]
      },
      {
        name:'firm-list',
        path:'firm-list',
        component: FirmList,
        requiresAuth: true,
        roles: ['super_admin'],
        meta: {
          slug: 'List Firms',
        },

        children: [
          {
            name:'partial-firm-view',
            path:'partial-firm-view/:id',
            component: FirmView,
            meta: {
              slug: 'View Firm',
            },
          },
          {
            name:'create-firm',
            path:'create-firm',
            component: CreateEditFirms,
            requiresAuth: true,
            roles: ['admin'],
            meta: {
              slug: 'Register Firm',
            },
          },
          {
            name:'edit-firm',
            path:'edit-firm/:id',
            component: CreateEditFirms,
            requiresAuth: true,
            roles: ['admin'],
            meta: {
              slug: 'Register Firm',
            },
          },
        ]
      },
      {
        name:'branch-list',
        path:'branch-list',
        component: ListBranches,
        meta: {
          slug: 'List Branches',
        },

        children: [
          {
            name:'create-branch',
            path:'create-branch',
            component: CreateEditBranch,
            meta: {
              slug: 'Register Branch',
            },
          }
        ]
      },
      {
        name:'branch-view',
        path:'branch-view/:id',
        component: BranchView,
        meta: {
          slug: 'View Branch',
        },
        children: [
          {
            name:'branch-analytics',
            path:'branch-analytics',
            component: BranchAnalytics,
            meta: {
              slug: 'Branch Analytics',
            },

          },
          {
            name:'branch-employees',
            path:'branch-employees',
            component: BranchEmployees,
            meta: {
              slug: 'Branch Employees',
            },

          },
        ]
      },
      {
        name:'employees',
        path:'employees',
        component: Employees,
        meta: {
          slug: 'List Employees',
        },
        children: [
          {
            name:'register-user',
            path:'register-user',
            component: UserCreateEdit,
            requiresAuth: true,
            roles: ['admin'],
            meta: {
              slug: 'System Users',
            },
          },
          {
            name:'edit-user',
            path:'edit-user/:id',
            component: UserCreateEdit,
            requiresAuth: true,
            roles: ['admin'],
            meta: {
              slug: 'Edit Users',
            },
          },
        ]
      },
      {
        name:'moves',
        path:'moves',
        component: MoveList,
        meta: {
          slug: 'List Moves',
        },
        children: [
          {
            name:'move-view',
            path:'move-view/:id',
            component: MoveView,
            meta: {
              slug: 'View Move',
            }
          },
          {
            name:'create-move',
            path:'create-move',
            component: CreateEditMove,
            meta: {
              slug: 'Register Moves',
            }
          },
          {
            name:'edit-move',
            path:'edit-move/:id',
            component: CreateEditMove,
            meta: {
              slug: 'Edit Moves',
            }
          },
        ]
      },
      {
        name: 'firm-setup',
        path: 'firm-setup',
        component: FirmSetup,
        meta: {
          slug: 'Firm Setup',
        },
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;