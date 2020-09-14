import {
  defineComponent,
  Transition,
  Teleport,
  h,
  withDirectives,
  vShow,
} from 'vue'
import type { PropType, SetupContext } from 'vue'
//蒙层，mask组件
import ElOverlay from '../overlay/index'
//将部分弹窗实现的逻辑，从主逻辑中抽离
import {
  default as useDialog,
  CLOSE_EVENT,
  OPEN_EVENT,
  UPDATE_MODEL_EVENT,
} from './event'
export default defineComponent({
  name: 'elDialog',
  props: {
    appendToBody: {
      type: Boolean,
      default: false,
    },
    beforeClose: {
      type: Function as PropType<(...args: any[]) => unknown>,
    },
    destroyOnClose: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    modal: {
      type: Boolean,
      default: true,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    top: {
      type: String,
      default: '15vh',
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
    width: {
      type: String,
      default: '50%',
      // 需要有单位
      validator: (val: string) =>
        ['px', 'rem', 'em', 'vw', '%', 'vmin', 'vmax'].some((unit) =>
          val.endsWith(unit)
        ),
    },
    zIndex: {
      type: Number,
    },
  },
  emits: [
    OPEN_EVENT,
    CLOSE_EVENT,
    UPDATE_MODEL_EVENT,
  ],
  setup(props, ctx) {
    // 将init部分抽离
    return useDialog(props, ctx as SetupContext)
  },
  //渲染
  render() {
    if (this.destroyOnClose && !this.modelValue) {
      return null
    }
    const { $slots } = this
    const closeBtn = this.showClose
      ? h(
          'button',
          {
            type: 'button',
            class: 'el-dialog__headerbtn',
            ariaLabel: 'close',
            onClick: this.handleClose,
          },
          'X'
        )
      : null
    const header = h(
      'div',
      {
        class: 'el-dialog__header',
      },
      [
        $slots.header
          ? $slots.header()
          : h('span', { class: 'el-dialog__title' }, this.title),
        closeBtn,
      ]
    )

    const body = h(
      'div',
      {
        class: 'el-dialog__body',
      },
      $slots.default?.()
    )

    const footer = $slots.footer
      ? h('div', { class: 'el-dialog__footer' }, $slots.footer())
      : null

    const dialog = h(
      'div',
      {
        ariaModal: true,
        ariaLabel: this.title || 'dialog',
        class: [
          'el-dialog',
          {
            'is-fullscreen': this.fullscreen,
            'el-dialog--center': this.center,
          },
          this.customClass,
        ],
        ref: 'dialogRef',
        style: this.style,
        onClick: (e: MouseEvent) => e.stopPropagation(),
      },
      [header, body, footer]
    )
    //增加一个蒙层mask
    const overlay = withDirectives(
      h(
        ElOverlay,
        {
          mask: this.modal,
          onClick: this.onModalClick,
          zIndex: this.zIndex,
        },
        {
          default: () => dialog,
        }
      ),
      [[vShow, this.visible]]
    )
    //Transition动画
    const renderer = h(
      Transition,
      {
        name: 'dialog-fade',
        onAfterEnter: this.afterEnter,
        onAfterLeave: this.afterLeave,
      },
      {
        default: () => overlay,
      }
    )
    //Teleport 传送门
    if (this.appendToBody) {
      return h(
        Teleport,
        {
          to: 'body',
        },
        renderer
      )
    }
    return renderer
  },
})