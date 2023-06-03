import { App } from 'vue'

import SvgIcon from '@/components/SvgIcon/index.vue' // svg components

export default (app: App) => {
  app.component('svg-icon', SvgIcon)
}
