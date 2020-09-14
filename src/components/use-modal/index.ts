import { watch } from 'vue'
import { on } from '../../utils/dom'
import type { Ref, ComputedRef } from 'vue'
export const EVENT_CODE = {
  tab: 'Tab',
  enter: 'Enter',
  space: 'Space',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  top: 'ArrowTop',
  down: 'ArrowDown',
  esc: 'Escape',
  delete: 'Delete',
  backspace: 'Backspace',
}
type ModalInstance = {
  handleClose: () => void
};

const modalStack: ModalInstance[] = []

const closeModal = (e: KeyboardEvent) => {
  if (modalStack.length === 0) return
  if (e.code === EVENT_CODE.esc) {
    const topModal = modalStack[modalStack.length - 1]
    topModal.handleClose()
  }
}

export default (
  instance: ModalInstance,
  visibleRef: Ref<boolean> | ComputedRef,
) => {
  watch(
    () => visibleRef.value,
    val => {
      if (val) {
        modalStack.push(instance)
      } else {
        modalStack.splice(
          modalStack.findIndex(modal => modal === instance),
          1,
        )
      }
    },
  )
}

on(document, 'keydown', closeModal)
