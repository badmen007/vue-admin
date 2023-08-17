<template>
  <el-breadcrumb class="app-breadcrumb breadcrumb-container" separator="/">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span v-if="index === levelList.length - 1" class="no-redirect">{{
        item.meta?.title
      }}</span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta?.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import type { RouteLocationMatched, RouteLocationRaw } from "vue-router"
import { compile } from "path-to-regexp"

type PartialRouteLocationMatched = Partial<RouteLocationMatched>

const route = useRoute()
const router = useRouter()

// 导航类表存放matched里筛选的路由记录
const levelList = ref<Array<PartialRouteLocationMatched>>([])

// 判断是不是Dashboard路由
const isDashboard = (route?: PartialRouteLocationMatched) => {
  const name = route && route.name
  if (!name) {
    return false
  }
}

// 获取面包屑导航
const getBreadcrumb = () => {
  // 对匹配的路由进行过滤 过滤掉没有title属性的路由，没有title就无法作为面包屑导航
  let matched = route.matched.filter(
    (item) => item.meta && item.meta.title
  ) as PartialRouteLocationMatched[]
  // 获取第一个匹配路由记录
  const first = matched[0]
  // 我们要把dashboard作为首页 始终固定在面包屑导航第一个 Dashboard/System/Menu Management
  // 如果第一个匹配到的路由记录不是dashboard 我们自己就把它放在记录数组的第一项
  if (!isDashboard(first)) {
    matched = (
      [
        {
          path: "/dashboard",
          meta: {
            title: "Dashboard"
          }
        }
      ] as PartialRouteLocationMatched[]
    ).concat(matched)
  }
  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}

watch(
  () => route.path,
  () => {
    getBreadcrumb()
  },
  {
    immediate: true
  }
)

// 主要是针对 动态路由 /user/:id 进行动态参数填充
// path-to-regexp 文档说明 https://www.npmjs.com/package/path-to-regexp
const pathCompile = (path: string) => {
  // 根据路径变编译成正则函数 并接收具体参数 比如根据正则/user/:id 帮你将:id替换成
  //具体路径
  const toPath = compile(path)
  const params = route.params
  return toPath(params)
}

// 点击面包屑导航跳转
const handleLink = (route: PartialRouteLocationMatched) => {
  const { path, redirect } = route
  // 如果是重定向路由 就走重定向
  if (redirect) {
    router.push(redirect as RouteLocationRaw)
    return
  }
  router.push(pathCompile(path!))
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  line-height: 50px;
  font-size: 14px;
  margin-left: 8px;
}

.no-redirect {
  color: #97a8be;
  cursor: pointer;
}
</style>

<style lang="scss">
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.3s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breaadcrumb-leave-active {
  position: absolute;
}

.breadcrumb-move {
  transition: all 0.5s;
}
</style>
