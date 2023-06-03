import { App } from 'vue'

import { ElMessage, ElNotification, ElMessageBox } from 'element-plus'

//import 'element-plus/theme-chalk/el-message.css'
//import 'element-plus/theme-chalk/el-notification.css'
//import 'elmement-plus/theme-chalk/el-message-box.css'

export default (app: App): void => {
  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$notify = ElNotification
  app.config.globalProperties.$confirm = ElMessageBox.confirm
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$prompt = ElMessageBox.prompt
}
