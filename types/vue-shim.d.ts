declare module '*.vue' {
  import { Component, ComponentPublicInstance } from 'vue'
  const _default: Component & {
    new(): ComponentPublicInstance<any>
  }
  export default _default
}

declare type TimeoutHandle = ReturnType<typeof global.setTimeout>