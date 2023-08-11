import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    icon?: string;
    hidden?: boolean;
    noCache?: boolean;
    activeMenu?: string;
    breadcrumb?: boolean;
    affix?: boolean;
    alwaysShow?: boolean;
  }
}
