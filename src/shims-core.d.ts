import { ComponentCustomProps} from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProps {
    $message: any
    $notify: any
    $confirm: any
    $alert: any
    $prompt: any
  }
}
