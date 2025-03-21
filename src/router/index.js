import { createRouter, createWebHashHistory } from "vue-router";
import { getToken } from '@/utils/auth'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  { 
    path: "/home", 
    name: "home", 
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/Profile.vue"),
    children: [
      {
        path: "/materialManagement",
        name: "materialManagement",
        component: () => import("@/views/admin/MaterialManagement.vue"),
      },
      {
        path: "/exerciseManagement",
        name: "exerciseManagement",
        component: () => import("@/views/admin/ExerciseManagement.vue"),
      },
      {
        path: "/noteManagement",
        name: "noteManagement",
        component: () => import("@/views/admin/NoteManagement.vue"),
      },
      {
        path: "/userManagement",
        name: "userManagement",
        component: () => import("@/views/admin/UserManagement.vue"),
      },
      {
        path: "/dqManagement",
        name: "dqManagement",
        component: () => import("@/views/admin/dqManagement.vue"),
      },
      {
        path: "/userInfo",
        name: "userInfo",
        component: () => import("@/views/UserInfo.vue"),
      },
      {
        path: "/userNote",
        name: "userNote",
        component: () => import("@/views/UserNote.vue"),
      },
    ],
    meta: {
      requiresAuth: true, // 标记需要登录的页面
    },
  },
  {
    path: "/materials",
    name: "materials",
    component: () => import("@/views/Materials.vue"),
  },
  {
    path: "/exercises",
    name: "exercises",
    component: () => import("@/views/Exercises.vue"),
  },
  {
    path: "/materials",
    name: "materials",
    component: () => import("@/views/Materials.vue"),
  },
  {
    path: "/dailyQuestion",
    name: "dailyQuestion",
    component: () => import("@/views/dailyQuestion.vue"),
    meta: {
      requiresAuth: true, // 标记需要登录的页面
    },
  },
  {
    path: "/loginOrRegister",
    name: "loginOrRegister",
    component: () => import("@/views/LoginRegister.vue"),
  },
  
  {
    path: "/testFileUpload",
    name: "testFileUpload",
    component: () => import("@/views/test/FileUploadPage.vue"),
  },
  {
    path: "/localStorage",
    name: "localStorage",
    component: () => import("@/views/test/localStorage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  const token = getToken();

  // 检查目标路由是否需要登录
  if (to.meta.requiresAuth && !token) {
    // 未登录，跳转到登录页面
    next({ name: "loginOrRegister", query: { redirect: to.fullPath } });
  } else {
    // 已登录或不需要登录
    next();
  }
});
export default router;

