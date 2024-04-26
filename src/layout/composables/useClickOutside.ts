import { type Ref, onBeforeUnmount, onMounted, ref } from 'vue'

type OutsideClickListener = (event: MouseEvent) => void

const useClickOutside = (
  elementRef: Ref<HTMLElement | null>,
  menuActive: Ref<boolean>,
  onClickOutside: () => void
): { bind: () => void; unbind: () => void } => {
  const outsideClickListener = ref<OutsideClickListener | null>(null)

  const isOutsideClicked = (event: MouseEvent) => {
    const target = event.target as Node
    const element = elementRef.value

    return element && !(element.contains(target) || element.isSameNode(target))
  }

  const bind = () => {
    if (outsideClickListener.value && elementRef.value) {
      return
    }

    outsideClickListener.value = (event: MouseEvent) => {
      if (menuActive.value && isOutsideClicked(event)) {
        onClickOutside()
      }
    }

    document.addEventListener('click', outsideClickListener.value)
  }

  const unbind = () => {
    if (!outsideClickListener.value) {
      return
    }

    document.removeEventListener('click', outsideClickListener.value)
    outsideClickListener.value = null
  }

  onMounted(bind)
  onBeforeUnmount(unbind)

  return { bind, unbind }
}

export default useClickOutside
