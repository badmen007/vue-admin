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
          import(
            /* webpackChunkName: "role" */ "@/views/system/role/index.vue"
          ),
        meta: {
          title: "Role Management"
        }
      },
      {
        path: "user",
        name: "User Management",
        component: () =>
          import(
            /* webpackChunkName: "role" */ "@/views/system/user/index.vue"
          ),
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
          affix: true, // 固定标签
          noCache: true // 不缓存
        }
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        // 带参数的动态路由正则匹配 文档说明
        // https://next.router.vuejs.org/zh/guide/essentials/routematchingsyntax.html#%E5%8F%AF%E9%87%8D%E5%A4%8D%E7%9A%84%E5%8F%82%E6%95%B0
        path: "/redirect/:path(.*)", // 要匹配多级路由 应该加*号
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true // 404 hidden掉
    }
  }
]

export const routes = [...constantRoutes, ...asyncRoutes]

export default createRouter({
  history: createWebHistory(),
  routes
})
