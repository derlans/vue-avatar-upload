import type { ComputedRef, Ref, StyleValue } from 'vue'
import { computed, ref, watch } from 'vue'
export interface UseDraggableOptions{
  draggingBox?: Ref<HTMLElement | SVGElement | Document | null>
  range?: {
    x?: {
      min?: number
      max?: number
    }
    y?: {
      min?: number
      max?: number
    }
  }
  stop?: boolean
}
export function useDraggable(target: Ref<HTMLElement | SVGElement | null>, options: UseDraggableOptions = { stop: false }) {
  const draggingBox = options.draggingBox ?? ref(document)
  const range = options.range
  const stop = options.stop
  const x = ref(0)
  const y = ref(0)
  const isDraging = ref(false)
  const startPostion = {
    x: 0,
    y: 0,
  }
  function updateStartPostion(e: MouseEvent) {
    if (stop)
      e.stopPropagation()
    startPostion.x = e.x
    startPostion.y = e.y
  }
  const start = (e: MouseEvent) => {
    isDraging.value = true
    updateStartPostion(e)
  }
  const move = (e: MouseEvent) => {
    if (!isDraging.value) {
      updateStartPostion(e)
      return
    }
    x.value += e.x - startPostion.x
    y.value += e.y - startPostion.y
    if (range) {
      if (range.x?.min !== undefined && (x.value < range.x.min))
        x.value = range.x.min
      if (range.x?.max !== undefined && (x.value > range.x.max))
        x.value = range.x.max
      if (range.y?.min !== undefined && (y.value < range.y.min))
        y.value = range.y.min
      if (range.y?.max !== undefined && (y.value > range.y.max))
        y.value = range.y.max
    }
    updateStartPostion(e)
  }
  const end = (e: MouseEvent) => {
    isDraging.value = false
    updateStartPostion(e)
  }
  const style: ComputedRef<StyleValue> = computed(() => {
    return {
      top: `${y.value}px`,
      left: `${x.value}px`,
    }
  })
  watch(target, () => {
    if (target.value) {
      target.value.addEventListener('mousedown', start as any)
      draggingBox.value!.addEventListener('mousemove', move as any)
      draggingBox.value!.addEventListener('mouseup', end as any)
    }
  }
  , {
    immediate: true,
  })
  return {
    x,
    y,
    isDraging,
    style,
  }
}
