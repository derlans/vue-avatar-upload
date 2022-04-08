import type { Ref } from 'vue'
import { ref } from 'vue'
import { useEventListener } from './useEventListener'
export function useWheel(target: Ref<HTMLElement | SVGElement | null>) {
  const wheel = ref(0)
  function handle(e: WheelEvent) {
    wheel.value += e.deltaY > 0 ? 1 : -1
  }
  useEventListener(target, 'wheel', handle as any)
  return {
    wheel,
  }
}
