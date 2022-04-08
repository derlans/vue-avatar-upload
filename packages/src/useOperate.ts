import type { ComputedRef, StyleValue } from 'vue'
import { computed, ref, watch } from 'vue'
import { getProjectionLength } from './help'
import type { RefElement, Size } from './type'
import { useDraggable } from './useDraggable'
import { useWheel } from './useWheel'

export function useBackImgOperate(editBox: RefElement, imgSize: Size) {
  // 图片滚轮调整大小
  const { wheel } = useWheel(editBox)
  const bgImgZoom = computed(() => {
    return -wheel.value / 20 + 1 > 0 ? -wheel.value / 20 + 1 : 0
  })
  // 旋转角度
  const imgRotate = ref(0)
  function updateRotate() {
    imgRotate.value = (imgRotate.value + 90) % 360
  }
  // 拖动图片
  const { style: editPositionStyle, x: baImgX, y: baImgY } = useDraggable(editBox)
  const bgImgStyle = computed(() => {
    return {
      ...(editPositionStyle.value as object),
      width: `${imgSize.width * bgImgZoom.value}px`,
      height: `${imgSize.height * bgImgZoom.value}px`,
      transform: `rotate(${imgRotate.value}deg)`,
    }
  })
  return {
    bgImgZoom,
    editPositionStyle,
    baImgX,
    baImgY,
    bgImgStyle,
    imgRotate,
    updateRotate,
  }
}

export function useSelectOperate(initSize: number, select: RefElement, resize: RefElement, limitSize: Size) {
  const selectBoxSize = ref(initSize)
  // 监听resize按钮移动
  const { x: resizeX, y: resizeY } = useDraggable(resize, {
    stop: true,
  })
  // 限制范围
  const selectRange = {
    x: {
      min: 0,
      max: limitSize.width - selectBoxSize.value,
    },
    y: {
      min: 0,
      max: limitSize.height - selectBoxSize.value,
    },
  }
  // 更新范围
  function updateSelectRange() {
    selectRange.x.max = limitSize.width - selectBoxSize.value
    selectRange.y.max = limitSize.height - selectBoxSize.value
  }
  // 拖动选框
  const { style: selectPositionStyle, x: selectX, y: selectY } = useDraggable(select, {
    stop: true,
    range: selectRange,
  })
  // 选框大小位置style
  const selectBoxStyle: ComputedRef<StyleValue> = computed(() => {
    return {
      width: `${selectBoxSize.value}px`,
      height: `${selectBoxSize.value}px`,
      ...selectPositionStyle.value,
    }
  })
  // 限制选框大小
  function updateSelectSize() {
    if (selectBoxSize.value + selectX.value > limitSize.width)
      selectBoxSize.value = limitSize.width - selectX.value
    if (selectBoxSize.value + selectY.value > limitSize.height)
      selectBoxSize.value = limitSize.height - selectY.value
  }
  // 监听选框大小改变 更新限制范围
  watch([resizeX, resizeY], (newV, oldV) => {
    const sizeChangeX = newV[0] - oldV[0]
    const sizeChangeY = newV[1] - oldV[1]
    const sizeChange = parseFloat(getProjectionLength([sizeChangeX, sizeChangeY], [1, 1]).toFixed(1))
    selectBoxSize.value = Math.abs(selectBoxSize.value + sizeChange * 1.1)
    updateSelectSize()
    updateSelectRange()
  })
  return {
    resizeX,
    resizeY,
    selectBoxSize,
    selectBoxStyle,
    selectPositionStyle,
    selectX,
    selectY,
  }
}
