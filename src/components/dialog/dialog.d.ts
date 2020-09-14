export interface UseDialogProps {
  //仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效
  beforeClose?:(close:(shouldCancel:boolean)=>void)=>void,
  //是否可以通过点击 modal 关闭 Dialog
  closeOnClickModal:boolean,
  //是否可以通过按下 ESC 关闭 Dialog
  closeOnPressEscape: boolean,
  //关闭时销毁 Dialog 中的元素
  destroyOnClose: boolean,
  //是否全屏
  fullscreen: boolean,
  //
  modelValue: boolean,
  //顶部
  top: string,
  //宽度
  width: string,
  //z-index
  zIndex?: number
}