import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string // 路由菜单标题
    icon?: string // 路由菜单图标
    hidden?: boolean // 是否隐藏路由菜单
    noCache?: boolean // 是否缓存页面
    activeMenu?: string // 当前路由激活的菜单
    breadcrumb?: boolean // 是否显示在面包屑中
    affix?: boolean // 是否固定在标签页中
    alwaysShow?: boolean // 是否总是显示根路由
  }
}
