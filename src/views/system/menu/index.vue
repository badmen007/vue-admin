<template>
  <div class="menu-container">
    <!-- 菜单树 -->
    <el-card class="tree-card">
      <template #header>
        <el-button @click="handleCreateRootMenu">新增顶级菜单</el-button>
      </template>
      <div class="block">
        <div class="menu-tree">
          <el-tree
            :data="menus"
            highlight-current
            node-key="id"
            :expand-on-click-node="false"
            :check-strictly="true"
            @node-click="handleNodeClick"
            :props="defaultProps"
            draggable
            :allow-drop="allowDrop"
            :allow-drag="allowDrag"
            @node-drop="handleNodeDrop"
          >
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span>
                  <el-button link @click.stop="handleCreateChildMenu(data)">
                    添加
                  </el-button>
                  <el-button link @click.stop="handleRemoveMenu(node, data)">
                    删除
                  </el-button>
                </span>
              </span>
            </template>
          </el-tree>
        </div>
      </div>
    </el-card>

    <el-card class="edit-card">
      <template #header> 编辑菜单 </template>
      <editor-menu v-show="editData && editData.id" :data="editData" />
      <span v-if="editData == null">从菜单列表选择一项后，进行编辑</span>
    </el-card>

    <!-- 添加菜单 -->
    <right-panel v-model="dialogVisible" :title="panelTitle">
      <div class="menu-form">
        <el-form
          ref="menuFormRef"
          :model="menuFormData"
          :rules="menuFormRules"
          label-width="100px"
        >
          <el-form-item label="菜单名称" prop="title">
            <el-input
              v-model="menuFormData.title"
              placeholder="请输入菜单名称"
            />
          </el-form-item>
          <el-form-item label="路径" prop="path">
            <el-input
              v-model="menuFormData.path"
              placeholder="请输入路由路径"
            />
          </el-form-item>
          <el-form-item label="路由Name" prop="name">
            <el-input
              v-model="menuFormData.name"
              placeholder="请输入路由名称"
            />
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-input
              v-model="menuFormData.icon"
              placeholder="请输入icon名称"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitMenuForm"
              >创建菜单</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </right-panel>
  </div>
</template>

<script lang="ts" setup>
import { type FormInstance as IMenuForm } from "element-plus"
import { addNewMenu, removeMenuByID, updateBulkMenu } from "@/api/config/menu"
import { useMenuStore } from "@/stores/menu"
import { ITreeItemData } from "@/utils/generateTree"
import { MenuData } from "@/api/config/menu"
const { proxy } = getCurrentInstance()!
import { useReloadPage } from "@/hooks/useReload"
import EditorMenu from "./components/editorMenu.vue"
import { usePermissionStore } from "@/stores/permission"
interface ITreeNode {
  id: number
  title: string
  children: ITreeNode[]
  parentId?: number
  sortId: number
  parent: {
    data: ITreeNode
  }
  data: ITreeItemData
}
type IMenuItemNotID = Omit<ITreeItemData, "id">
const store = useMenuStore()
const treeData = computed(() => store.state.menuTreeData)
const menus = ref<ITreeItemData[]>([])
const editData = ref<MenuData>()
watch(treeData, (value: ITreeItemData[]) => {
  menus.value = JSON.parse(JSON.stringify(value))
  console.log(menus.value)
  editData.value = undefined
})

onMounted(() => {
  store.getAllMenuList()
})

// tree props
const defaultProps = ref({
  children: "children",
  label: "title"
})

const dialogVisible = ref(false)

watch(dialogVisible, (value) => {
  if (!value) {
    ;(menuFormRef.value as IMenuForm).resetFields()
  }
})

// 重置添加菜单状态
const resetStatus = () => {
  dialogVisible.value = false
  menuFormRef.value?.resetFields()
  parentData.value = null
}

// 新增顶级菜单
// 添加菜单表单
const menuFormRef = ref<IMenuForm | null>(null)
// 菜单表单数据
const menuFormData = reactive<IMenuItemNotID>({
  title: "",
  path: "",
  name: "",
  icon: "",
  parent_id: "",
  sort_id: 0
})

const menuType = ref(0) // 添加菜单类型 0顶级 1子级
// 面板title
const panelTitle = computed(() =>
  menuType.value === 0 ? "添加顶级菜单" : "添加子菜单"
)

// 重新刷新整个系统
const { reloadPage } = useReloadPage()

// ············· 添加顶级菜单 ······················
// 点击添加顶级菜单
const handleCreateRootMenu = () => {
  menuType.value = 0
  dialogVisible.value = true
}

// 移除节点
const removeNode = (node: ITreeNode, childId: number) => {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === childId)
  children.splice(index, 1)
  menus.value = [...menus.value]
}

const handleRemoveMenu = (node: ITreeNode, menuData: ITreeItemData) => {
  proxy
    ?.$confirm(`您确认要删除菜单${menuData.title}吗？`, "删除确认", {
      type: "warning"
    })
    .then(async () => {
      // 根据id删除菜单
      const res = await removeMenuByID(menuData.id)
      if (res.code === 0) {
        proxy?.$message.success("删除成功")
        removeNode(node, menuData.id)
        // 如果删除的是当前编辑的菜单 就重置编辑表单
        if (editData.value && menuData.id === editData.value.id) {
          editData.value = undefined
        }
        // 是否重新刷新整个系统
        reloadPage()
      }
    })
}

// 菜单编辑
const handleNodeClick = (data: MenuData) => {
  editData.value = { ...data }
}

// 分配sortId 根据最后一个数据sortId+1
const getMenuNodeSortID = (list: ITreeItemData[]) => {
  if (list && list.length > 0) {
    return list[list.length - 1].sort_id + 1
  }
  return 0
}

// 顶级菜单分配partentId和sortId
const allocRootMenuId = (data: IMenuItemNotID) => {
  const sortId = getMenuNodeSortID(menus.value)
  data.sort_id = sortId
  data.parent_id = "0"
}

// 顶级菜单 添加到 tree组件中
const appendRootMenu = (id: number, data: IMenuItemNotID) => {
  const node = { id, ...data, children: [] }
  menus.value.push(node)
  menus.value = [...menus.value]
}

const handleAddRootMenu = async (data: IMenuItemNotID) => {
  console.log(data, "IMenuItemNotID")
  allocRootMenuId(data)
  const res = await addNewMenu(data)
  if (res.code === 0) {
    const { id } = res.data
    appendRootMenu(id, data)
    proxy?.$message.success("菜单创建成功")
    // 是否重新刷新整个系统
    // reloadPage()
  }
}

// ············· 添加子菜单 ······················
// 子菜单分配sortid 和 parentId
const allocChildMenuId = (
  data: IMenuItemNotID,
  parentData: ITreeItemData
): IMenuItemNotID => {
  const pid = parentData.id as number
  let sortId = 0
  if (!parentData.children) {
    parentData.children = []
  }
  if (parentData.children.length > 0) {
    sortId = getMenuNodeSortID(parentData.children)
  }
  data.sort_id = sortId
  data.parent_id = pid
  return data
}

// 添加子菜单到tree组件中
const appendChildMenu = (child: ITreeItemData, parentData: ITreeItemData) => {
  parentData.children!.push(child)
  menus.value = [...menus.value]
}

const handleAddChildMenu = async (data: IMenuItemNotID) => {
  const child = allocChildMenuId(data, parentData.value!)
  const res = await addNewMenu(data)
  if (res.code === 0) {
    const { id } = res.data
    ;(child as ITreeItemData).id = id
    appendChildMenu(child as ITreeItemData, parentData.value!)
    proxy?.$message.success("菜单创建成功")
    // 是否重新刷新整个系统
    reloadPage()
  }
}

// 提交menuForm
const submitMenuForm = () => {
  ;(menuFormRef.value as IMenuForm).validate(async (valid) => {
    if (valid) {
      if (menuType.value === 0) {
        // 添加根菜单
        await handleAddRootMenu({ ...menuFormData })
      } else if (menuType.value === 1) {
        // 添加子菜单
        await handleAddChildMenu({ ...menuFormData })
      }
      // 重置相关状态
      resetStatus()
    }
  })
}

// 拖放一级节点
type DropType = "before" | "after" | "inner"
const allowDrop = (
  draggingNode: ITreeNode,
  dropNode: ITreeNode,
  type: DropType
) => {
  if (dropNode.data.parent_id === 0 || dropNode.data.parent_id == null) {
    return type !== "inner"
  }
}

const allowDrag = (draggingNode: ITreeNode) => {
  const data = draggingNode.data
  return data.parent_id === 0 || data.parent_id == null
}
const { generateRoutes } = usePermissionStore()
// 拖放完成事件
const handleNodeDrop = async () => {
  menus.value.forEach((menu, index) => {
    menu.sort_id = index
  })
  // 批量更新菜单状态 这里是为了更新sort_id
  const menuList = menus.value.map((menu) => {
    const temp = { ...menu }
    delete temp.children
    return temp
  })
  // 批量更新
  const res = await updateBulkMenu(menuList)
  if (res.code === 0) {
    // 重新生成菜单 1 代表是菜单排序更新
    generateRoutes(1)
  }
}
// 新增子菜单
const handleCreateChildMenu = (data: ITreeItemData) => {
  menuType.value = 1
  dialogVisible.value = true
  parentData.value = data
}

const parentData = ref<ITreeItemData | null>(null) // 缓存父菜单data

// 验证规则
const menuFormRules = reactive({
  title: {
    required: true,
    message: "请输入菜单名称",
    trigger: "blur"
  },
  path: {
    required: true,
    message: "请输入路由路径",
    trigger: "blur"
  },
  name: {
    required: true,
    message: "请输入路由名称",
    trigger: "blur"
  }
})
</script>

<style lang="scss">
.menu-container {
  display: flex;
  padding: 20px;
  justify-content: space-around;
  .menu-tree {
    height: 400px;
    overflow-y: scroll;
  }
  .tree-card {
    min-width: 500px;
    padding-bottom: 30px;
  }
  .edit-card {
    flex: 1;
    margin-left: 15px;
  }
  .el-form-item__content {
    min-width: 220px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .menu-form {
    padding: 20px 10px 20px 0;
    box-sizing: border-box;
  }
}
</style>
