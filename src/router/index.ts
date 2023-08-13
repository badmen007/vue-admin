import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue"

export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/documentation",
    component: Layout, // 布局组件作为以及路由
    redirect: "/documentation/index",
    children: [
      {
        path: "index",
        name: "Documentation",
        component: () =>
          import(
            /* webpackChunkName: "documentation" */ "@/views/documentation/index.vue"
          ),
        meta: {
          title: "Documentation",
          icon: "documentation",
          hidden: false
        }
      }
    ]
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        name: "Guide",
        component: () =>
          import(/* webpackChunkName: "guide" */ "@/views/guide/index.vue"),
        meta: {
          title: "Guide",
          icon: "guide",
          // 默认加载Guide时，/documentation/index高亮显示
          activeMenu: "/documentation/index"
        }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    meta: {
      title: "System",
      icon: "lock",
      alwaysShow: true // 始终显示，哪怕是只有一个子路由
    },
    children: [
      {
        path: "menu",
        name: "Menu Management",
        component: () =>
          import(/* webpackChunkName: "menu" */ "@/views/system/menu.vue"),
        meta: {
          title: "Menu Management"
        }
      },
      {
        path: "role",
        name: "Role Management",
        component: () =>
          import(/* webpackChunkName: "role" */ "@/views/system/role.vue"),
        meta: {
          title: "Role Management"
        }
      },
      {
        path: "user",
        name: "User Management",
        component: () =>
          import(/* webpackChunkName: "role" */ "@/views/system/user.vue"),
        meta: {
          title: "User Management"
        }
      }
    ]
  },
  {
    path: "/external-link",
    component: Layout,
    children: [
      {
        path: "http://wwww.baidu.com",
        redirect: "/",
        meta: {
          title: "External Link",
          icon: "link"
        }
      }
    ]
  }
]

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/dashboard/index.vue"
          ),
        meta: {
          title: "Dashboard",
          icon: "dashboard",
          affix: true // 固定标签
        }
      }
    ]
  }
]

export const routes = [...constantRoutes, ...asyncRoutes]

export default createRouter({
  history: createWebHistory(),
  routes
})
