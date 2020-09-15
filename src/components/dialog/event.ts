import { computed, ref, watch, nextTick, onMounted } from 'vue'
import useModal from '../use-modal/index'
import type { UseDialogProps } from './dialog'
import type { SetupContext } from '@vue/runtime-core'

export const CLOSE_EVENT = 'close'
export const OPEN_EVENT = 'open'
export const UPDATE_MODEL_EVENT = 'update:modelValue'


export default function (props: UseDialogProps, ctx: SetupContext) {
  const zIndex = ref(props.zIndex)
  const closed = ref(false)
  const visible = ref(true)
  //设置css  全屏，top，width
  const style = computed(() => {
    const style = {} as CSSStyleDeclaration
    if (!props.fullscreen) {
      style.marginTop = props.top
      if (props.width) {
        style.width = props.width
      }
    }
    style.zIndex = String(zIndex.value + 1)
    return style
  })
  //关闭function
  const handleClose = ()=>{
    close()
  }
  watch(() => props.modelValue, val => {
    if (val) {
      open()
    } else {
      close()
    }
   })
  //打开
  function open() {
    ctx.emit(OPEN_EVENT)
    ctx.emit(UPDATE_MODEL_EVENT, true)
    closed.value = false
    visible.value = true
  }
  //关闭（判断beforeClose）
  function close() {
    if (props.beforeClose) {
      props.beforeClose(hide)
    }else{
      hide()
    }
    
  }
  //关闭
  const hide = ()=>{
    ctx.emit(CLOSE_EVENT)
    ctx.emit(UPDATE_MODEL_EVENT, false)
    closed.value = true
    visible.value = false
  }
  //esc 关闭
  if (props.closeOnPressEscape) {
    useModal(
      {
        handleClose,
      },
      visible
    )
  }
  //点击
  const onModalClick = ()=>{
    if (props.closeOnClickModal) {
      handleClose()
    }
  }
  //transition 事件
  const afterLeave = ()=>{
    ctx.emit(CLOSE_EVENT)
  }
  const afterEnter = () => {
    ctx.emit(OPEN_EVENT)
  }
  onMounted(() => {
    if (props.modelValue) {
      open()
    }
  })
  return {
    style,
    zIndex,
    visible,
    afterLeave,
    afterEnter,
    handleClose,
    onModalClick,
  }
}
