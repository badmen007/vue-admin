<template>
  <div class="role-container">
    <h2>角色管理</h2>
    <el-button type="primary" plain @click="handleAddRole">
      <el-icon style="vertical-align: middle">
        <el-icon-plus />
      </el-icon>
      添加权限
    </el-button>
    <el-table :data="roles" max-height="400">
      <el-table-column prop="name" label="角色名称"> </el-table-column>
      <el-table-column prop="description" label="说明"> </el-table-column>
      <el-table-column
        prop="is_default"
        label="是否默认角色"
        :formatter="formatter"
      >
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间"> </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间"> </el-table-column>
      <el-table-column label="操作" fixed="right" width="150px">
        <template #default="scope">
          <el-button
            link
            size="small"
            @click="handleRoleMenu(scope.$index, scope.row)"
          >
            菜单权限
          </el-button>
          <el-button
            link
            size="small"
            @click="handleEditRole(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            link
            size="small"
            @click="handleDeleteRole(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="role-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :total="total"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, prev, pager, next, sizes,jumper"
      ></el-pagination>
    </div>
    <!-- 新增角色 编辑角色面板 -->
    <right-panel v-model="panelVisible" :title="panelTitle" :size="330">
      <editor-role
        :type="editType"
        :data="editData"
        @submit="handleSubmitRole"
      />
    </right-panel>
    <!-- 权限菜单树 -->
    <role-menu
      v-if="roleData && roleMenuVisible"
      :role="roleData"
      v-model="roleMenuVisible"
    />
  </div>
</template>

<script lang="ts" setup>
import { ActionRoleParams, useRoleStore } from "@/stores/role"
import { IRole } from "@/api/config/role"
import EditorRole from "./components/editorRole.vue"
import { useMenuStore } from "@/stores/menu"

const { proxy } = getCurrentInstance()!

const store = useRoleStore()
// 角色列表
const roles = computed(() => store.state.roles)
// 总条数
const total = computed(() => store.state.count)
// 分页页码 条数 页码后端是从0开始 前端是从1开始
const pageNum = ref(0)
const pageSize = ref(1)
// 暂存新增和编辑数据
const editData = ref<IRole | undefined>(undefined)
// 编辑面板显示
const panelVisible = ref(false)
// 面板操作类型
const editType = ref(1) // 0编辑 1新增
// panel title
const panelTitle = computed(() =>
  editType.value === 1 ? "新增角色" : "编辑角色"
)

// 获取角色列表
const getRoleList = () => {
  store.getRoles({ pageNum: pageNum.value, pageSize: pageSize.value })
}

watchEffect(() => {
  getRoleList()
})

// 编辑角色处理
const handleEditRole = (index: number, row: IRole) => {
  editType.value = 0
  editData.value = row
  panelVisible.value = true
}

// 添加角色处理
const handleAddRole = () => {
  editType.value = 1
  editData.value = {} as IRole
  panelVisible.value = true
}

// 删除角色处理
const handleDeleteRole = (index: number, row: IRole) => {
  proxy
    ?.$confirm(`您确认要删除角色${row.name}吗？`, "删除确认", {
      type: "warning"
    })
    .then(async () => {
      await store.removeRole({
        id: row.id,
        pageSize: pageSize.value,
        pageNum: pageNum.value
      } as ActionRoleParams)
      proxy?.$message.success("角色删除成功")
    })
    .catch(() => {
      proxy?.$message({
        type: "info",
        message: "已取消删除"
      })
    })
}

// 新增角色
const addNewRole = async (data: IRole) => {
  await store.addRole({
    ...data,
    pageSize: pageSize.value,
    pageNum: pageNum.value
  })
  proxy?.$message.success("角色添加成功")
  panelVisible.value = false
}
// 编辑角色
const editRole = async (data: IRole) => {
  await store.editRole({
    ...data,
    pageSize: pageSize.value,
    pageNum: pageNum.value
  })
  proxy?.$message.success("角色编辑成功")
  panelVisible.value = false
}

const handleSubmitRole = (data: IRole) => {
  if (editType.value === 1) {
    // 新增
    addNewRole(data)
  } else if (editType.value === 0) {
    // 编辑
    editRole(data)
  }
}

// 权限菜单处理
const roleMenuVisible = ref(false)
const roleData = ref<IRole | null>(null)
const handleRoleMenu = (index: number, row: IRole) => {
  roleMenuVisible.value = true
  roleData.value = row
}

const formatter = (row: IRole) => {
  return row.is_default ? "是" : "否"
}

// pageSize 改变
const handleSizeChange = (val: number) => {
  pageSize.value = val
}
// pageNum 改变
const handleCurrentChange = (val: number) => {
  pageNum.value = val - 1 // 页码后端是从0开始的
}

const menuStore = useMenuStore()
// 获取菜单列表
onMounted(() => {
  menuStore.getAllMenuList()
})
</script>

<style lang="scss" scoped>
.role-container {
  padding: 30px;
  .role-pagination {
    margin-top: 10px;
    text-align: right;
  }
}
</style>
