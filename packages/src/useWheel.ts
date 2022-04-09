import type { Ref } from 'vue'
import { ref } from 'vue'
import { useEventListener } from './useEventListener'
export function useWheel(target: Ref<HTMLElement | SVGElement | null>, func: Function) {
  const wheel = ref(0)
  function handle(e: WheelEvent) {
    wheel.value += e.deltaY > 0 ? 1 : -1
    func(e.deltaY > 0 ? 1 : -1)
    e.preventDefault()
  }
  useEventListener(target, 'wheel', handle as any)
  return {
    wheel,
  }
}
