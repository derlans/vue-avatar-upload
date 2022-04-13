import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'
import type { PositionStyle } from './type'
import { useEventListener } from './useEventListener'
import { isMobile } from './utils'
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
  preventDefault?: boolean
  stopPropagation?: boolean
}
export function useDraggable(target: Ref<HTMLElement | SVGElement | null>, options?: UseDraggableOptions) {
  const draggingBox = options?.draggingBox ?? ref(document)
  const { range = {}, preventDefault = false, stopPropagation = true } = options || {}
  const _isMobile = isMobile()
  const x = ref(0)
  const y = ref(0)
  const isDraging = ref(false)
  const startPostion = {
    x: 0,
    y: 0,
  }
  const prevenMtobileTouch = (e: Event) => {
    e.preventDefault()
  }
  function updateStartPostion(e: MouseEvent| TouchEvent) {
    if (stopPropagation)
      e.stopPropagation()
    if (preventDefault)
      e.preventDefault()
    if (_isMobile) {
      const _e = e as TouchEvent
      startPostion.x = _e.touches[0].clientX
      startPostion.y = _e.touches[0].clientY
    }
    else {
      const _e = e as MouseEvent
      startPostion.x = _e.x
      startPostion.y = _e.y
    }
  }
  function start(e: MouseEvent| TouchEvent) {
    isDraging.value = true
    updateStartPostion(e)
    if (_isMobile) {
      document.addEventListener('touchmove', prevenMtobileTouch, { passive: false })
      draggingBox.value?.addEventListener('touchmove', move as any)
      draggingBox.value?.addEventListener('touchend', end as any)
    }
    else {
      draggingBox.value?.addEventListener('mousemove', move as any)
      draggingBox.value?.addEventListener('mouseup', end as any)
    }
  }
  function move(e: MouseEvent| TouchEvent) {
    if (!isDraging.value)
      return
    if (_isMobile) {
      const _e = e as TouchEvent
      x.value += _e.touches[0].clientX - startPostion.x
      y.value += _e.touches[0].clientY - startPostion.y
    }
    else {
      const _e = e as MouseEvent
      x.value += _e.x - startPostion.x
      y.value += _e.y - startPostion.y
    }
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
  function end() {
    if (_isMobile) {
      document.removeEventListener('touchmove', prevenMtobileTouch)
      draggingBox.value?.removeEventListener('touchmove', move as any)
      draggingBox.value?.removeEventListener('touchend', end as any)
    }
    else {
      draggingBox.value?.removeEventListener('mousemove', move as any)
      draggingBox.value?.removeEventListener('mouseup', end as any)
    }

    isDraging.value = false
  }
  const style: ComputedRef<PositionStyle> = computed(() => {
    return {
      top: `${y.value}px`,
      left: `${x.value}px`,
    }
  })
  if (_isMobile)
    useEventListener(target, 'touchstart', start as any)
  else
    useEventListener(target, 'mousedown', start as any)
  return {
    x,
    y,
    isDraging,
    style,
  }
}
