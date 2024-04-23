// import { ref, onMounted, onBeforeUnmount } from 'vue'
//
// type OutsideClickListener = (event: MouseEvent) => void
//
// export function useOutsideClickListener(activeState: Ref<boolean>, targetSelector: string): void {
//   const outsideClickListener = ref<OutsideClickListener | null>(null)
//
//   onMounted(() => {
//     bindOutsideClickListener()
//   })
//
//   onBeforeUnmount(() => {
//     unbindOutsideClickListener()
//   })
//
//   const bindOutsideClickListener = () => {
//     if (outsideClickListener.value) {
//       return
//     }
//
//     outsideClickListener.value = (event: MouseEvent) => {
//       if (isOutsideClicked(event)) {
//         activeState.value = false
//       }
//     }
//
//     document.addEventListener('click', outsideClickListener.value)
//   }
//
//   const unbindOutsideClickListener = () => {
//     if (!outsideClickListener.value) {
//       return
//     }
//
//     document.removeEventListener('click', outsideClickListener.value)
//     outsideClickListener.value = null
//   }
//
//   const isOutsideClicked = (event: MouseEvent) => {
//     if (!activeState.value) return false
//
//     const targetEl = document.querySelector(targetSelector)
//     const targetNode = event.target as Node
//
//     return targetEl && !targetEl.contains(targetNode)
//   }
// }
