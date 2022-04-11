import type { Ref } from 'vue'
import { watch } from 'vue'
type F=(e: Event) => any
export function useEventListener<K extends keyof HTMLElementEventMap>(target: Ref<HTMLElement | SVGElement| Document | null>, event: K, func: F, options?: any) {
  watch(target, () => {
    if (target.value) {
      const el = target.value!
      el.addEventListener(event, func, options)
    }
  }, {
    immediate: true,
  })
}
