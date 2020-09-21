declare module '*.vue' {
  import { Component, ComponentPublicInstance } from 'vue'
  const _default: Component & {
    new(): ComponentPublicInstance<any>
  }
  export default _default
}
declare module 'vue/types/vue' {
  interface Vue {
    [key: string]: any,
  }
}
declare let global: any
declare type TimeoutHandle = ReturnType<typeof global.setTimeout>