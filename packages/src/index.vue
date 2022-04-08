<template>
  <div class="avatar-upload">
    <div class="avatar-upload-header">
      <div class="avatar-upload-title">
        编辑头像
      </div>
      <div class="avatar-upload-close">
        关闭
      </div>
    </div>
    <div class="avatar-upload-main">
      <div ref="editBox" class="avatar-upload-edit" :style="editBoxSizeStyle">
        <div class="edit-fade" />
        <div ref="select" class="edit-select" :style="selectBoxStyle">
          <span class="edit-selcet-img-box">
            <img :src="Props.avatar" alt="" :style="selsctImgStyle" class="edit-select-img" @dragstart.prevent="" @select.prevent="">
          </span>
          <span class="edit-selcet-border border-3-white" />
          <span ref="resize" class="select-zoom-point" />
        </div>
        <img ref="avatar" :src="Props.avatar" alt="" :style="bgImgStyle" class="edit-bg" @dragstart.prevent="" @select.prevent="">
      </div>
      <div class="avatar-upload-preview">
        <span>头像预览</span>
        <div class="preview-radius border-3-white">
          <img :src="Props.avatar" alt="" :style="previewImgStyle" @dragstart.prevent="" @select.prevent="">
        </div>
        <div class="preview-square">
          <img :src="Props.avatar" alt="" :style="previewImgStyle" @dragstart.prevent="" @select.prevent="">
        </div>
      </div>
    </div>
    <div class="avatar-upload-operation">
      <div @click="updateRotate">
        旋转90度
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" >
import type { ComputedRef, Ref, StyleValue } from 'vue'
import { computed, reactive, ref, watch } from 'vue'
import { createCutImg } from './help'
import type { MRef, RefElement, Size, SizeStyle } from './type'
import { useBackImgOperate, useSelectOperate } from './useOperate'
interface IProps{
  avatar?: string
  url?: string
  field?: string
  params?: Record<string, any>
  headers?: Record<string, any>
  /**
   * @description 初始宽度
   */
  width?: number
  /**
   * @description 初始长度
   */
  height?: number
  selectSize?: number
  withCredentials?: boolean
}
const Props = withDefaults(defineProps<IProps>(), {
  field: 'avatar',
  width: 300,
  height: 300,
  withCredentials: false,
  selectSize: 100,
})
// 编辑框尺寸不是响应式的
const { width: editBoxWidth, height: editBoxHeight, selectSize: initSelectSize } = Props
// 编辑器尺寸style
const editBoxSizeStyle: SizeStyle = {
  width: `${editBoxWidth}px`,
  height: `${editBoxHeight}px`,
}
// 图片尺寸 图片加载完之前默认为编辑器尺寸
const imgSize: Size = reactive({
  width: editBoxWidth,
  height: editBoxHeight,
})
// 头像图片element
const avatar: MRef<HTMLImageElement> = ref(null)
// 图片改动就重置尺寸
watch(avatar, () => {
  if (avatar.value)
    initImgSize()
}, {
  immediate: true,
})
// 把图片变为object-fit: cover;的形式 填充满不拉伸
function initImgSize() {
  const el = avatar.value
  const width = el.naturalWidth
  const height = el.naturalHeight
  if (width / height > editBoxWidth / editBoxHeight) {
    imgSize.height = editBoxHeight
    imgSize.width = width * editBoxHeight / height
  }
  else {
    imgSize.width = editBoxWidth
    imgSize.height = height * editBoxWidth / width
  }
}
// 编辑器最外层element 确定拖拽和滚动的范围
const editBox: RefElement = ref(null)
// 背景图片的操作 包括缩放、旋转、移动
const {
  bgImgZoom,
  baImgX,
  baImgY,
  bgImgStyle,
  imgRotate,
  updateRotate,
} = useBackImgOperate(editBox, imgSize)
// 选择框
const select: RefElement = ref(null)
// 调整选择器大小按钮
const resize: RefElement = ref(null)
// 选择框的操作 包括缩放、移动
const {
  selectBoxSize,
  selectBoxStyle,
  selectX,
  selectY,
} = useSelectOperate(initSelectSize, select, resize, { width: editBoxWidth, height: editBoxHeight })
// 选择框内图片的样式
const selsctImgStyle: ComputedRef<StyleValue> = computed(() => {
  return {
    width: `${imgSize.width * bgImgZoom.value}px`,
    height: `${imgSize.height * bgImgZoom.value}px`,
    left: `${baImgX.value - selectX.value}px`,
    top: `${baImgY.value - selectY.value}px`,
    transform: `rotate(${imgRotate.value}deg)`,
  }
})
// 预览图片的样式
const previewImgStyle: ComputedRef<StyleValue> = computed(() => {
  const zoom = (initSelectSize / selectBoxSize.value)
  return {
    width: `${imgSize.width * zoom * bgImgZoom.value}px`,
    height: `${imgSize.height * zoom * bgImgZoom.value}px`,
    left: `${(baImgX.value - selectX.value) * zoom}px`,
    top: `${(baImgY.value - selectY.value) * zoom}px`,
    transform: `rotate(${imgRotate.value}deg)`,
  }
})
// const cutImg = createCutImg()
// function getImgData() {
//   return cutImg(Props.avatar, {
//     x: {
//       begin: 0,
//       end: 300,
//     },
//     y: {
//       begin: 0,
//       end: 300,
//     },
//   })
// }

</script>

<style scoped >
.avatar-upload{
  border-radius: 10px;
  background-color: #fff;
  padding: 5px 15px;
  user-select: none;
}
.border-3-white{
  border: 3px solid#fff;
}
.avatar-upload-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  font-size: 16px;
  font-weight: 700;
}
.avatar-upload-main{
  padding: 10px;
  display: flex;
  justify-content:center;
}
.avatar-upload-edit{
  position: relative;
  cursor: move;
  margin-right: 10px;
  overflow: hidden;
}
.edit-fade{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3;
}
.edit-select{
  position: absolute;
  border-radius: 50%;
  cursor: move;
  z-index: 3;
}
/*  不要让选择框有边框 会影响计算位置 因此另外造一个当边框*/
.edit-selcet-border{
  position: absolute;
  display: block;
  width: calc(100% + 4px);
  height:calc(100% + 4px);
  border-radius: 50%;
  box-sizing: border-box;
  top: -2px;
  left: -2px;
}
.select-zoom-point{
  position: absolute;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  left: 84%;
  top: 84%;
  cursor: se-resize;
}
.edit-selcet-img-box{
  overflow: hidden;
  position: absolute;
  display: block;
  width: 100%;
  height:100%;
  border-radius: 50%;
}
.edit-select-img{
  user-select: none;
  display: block;
  position: absolute;
}
.edit-bg{
  user-select: none;
  display: block;
  position: absolute;
  z-index: 2;
  cursor: move;
}
.avatar-upload-preview{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #939393;
  padding: 10px;
}
.preview-radius{
  border-radius: 50%;
  overflow: hidden;
  height: 100px;
  width: 100px;
  position: relative;
}
.preview-radius>img{
  position: absolute;
}
.preview-square{
  overflow: hidden;
  height: 100px;
  width: 100px;
  position: relative;
}
.preview-square>img{
  position: absolute;
}
</style>
