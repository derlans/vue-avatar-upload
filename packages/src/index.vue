<template>
  <div :class="{'avatar-upload-fade':Props.fixed}">
    <div :class="{'avatar-upload':true,'avatar-upload-fixed':Props.fixed}">
      <div class="avatar-upload-header">
        <div class="avatar-upload-title">
          编辑头像
        </div>
        <div class="avatar-upload-close" @click="Props.onClose">
          <svg t="1649489376154" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2215" width="16" height="16"><path d="M184.64768 836.34176c3.9936 3.9936 9.23648 5.98016 14.47936 5.98016 5.24288 0 10.48576-2.00704 14.49984-6.00064l292.70016-293.04832 292.70016 293.04832c3.9936 4.01408 9.23648 6.00064 14.49984 6.00064 5.24288 0 10.48576-2.00704 14.47936-5.98016 8.00768-7.9872 8.00768-20.95104 0.02048-28.95872L535.61344 514.64192 828.0064 221.92128c7.9872-8.00768 7.9872-20.97152-0.02048-28.95872-8.02816-8.00768-20.97152-8.00768-28.95872 0.02048L506.30656 486.03136 213.6064 192.98304c-8.00768-8.00768-20.97152-8.00768-28.95872-0.02048-8.00768 7.9872-8.00768 20.95104-0.02048 28.95872l292.37248 292.72064L184.6272 807.38304C176.64 815.37024 176.64 828.35456 184.64768 836.34176z" fill="" p-id="2216" /></svg>
        </div>
      </div>
      <div class="avatar-upload-main">
        <div>
          <div ref="editBox" class="avatar-upload-edit" :style="editBoxSizeStyle">
            <div class="edit-fade" />
            <div ref="select" class="edit-select" :style="selectBoxStyle">
              <span class="edit-selcet-img-box">
                <img :src="avatar" alt="" :style="selsctImgStyle" class="edit-select-img" @dragstart.prevent="" @select.prevent="">
              </span>
              <span class="edit-selcet-border border-3-white" />
              <span ref="resize" class="select-zoom-point" />
            </div>
            <img ref="bgAvatar" :src="avatar" alt="" :style="bgImgStyle" class="edit-bg" @dragstart.prevent="" @select.prevent="">
          </div>
          <div class="avatar-upload-operation">
            <span style="cursor: pointer;" @click="file.click()">更换头像</span>
            <span style="cursor: pointer;" class="upload-operation-close" @click="updateRotate">
              <svg t="1649489582570" class="icon-rotate" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3047" width="16" height="16"><path d="M503.466667 285.866667L405.333333 226.133333c-8.533333-8.533333-12.8-21.333333-8.533333-29.866666 8.533333-8.533333 21.333333-12.8 29.866667-8.533334l145.066666 89.6c8.533333 4.266667 12.8 17.066667 8.533334 29.866667l-89.6 145.066667c-4.266667 8.533333-17.066667 12.8-29.866667 8.533333-8.533333-4.266667-12.8-17.066667-8.533333-29.866667l64-102.4c-123.733333 4.266667-226.133333 106.666667-226.133334 234.666667s106.666667 234.666667 234.666667 234.666667c85.333333 0 162.133333-46.933333 204.8-119.466667 4.266667-8.533333 17.066667-12.8 29.866667-8.533333 8.533333 4.266667 12.8 17.066667 8.533333 29.866666-51.2 85.333333-140.8 140.8-238.933333 140.8-153.6 0-277.333333-123.733333-277.333334-277.333333 0-145.066667 110.933333-264.533333 251.733334-277.333333z" p-id="3048" /></svg>
              <span>旋转90度</span>
            </span>
          </div>
        </div>
        <div class="avatar-upload-preview">
          <span>头像预览</span>
          <div class="preview-radius border-3-white" :style="previewBoxSizeStyle">
            <img :src="avatar" alt="" :style="previewImgStyle" @dragstart.prevent="" @select.prevent="">
          </div>
          <div class="preview-square" :style="previewBoxSizeStyle">
            <img :src="avatar" alt="" :style="previewImgStyle" @dragstart.prevent="" @select.prevent="">
          </div>
        </div>
      </div>
      <div class="avatar-upload-actions">
        <div @click="Props.onClose">
          <slot name="close" />
        </div>
        <div @click="upload">
          <slot name="upload" />
        </div>
      </div>
      <div v-show="false" class="avatar-upload-form">
        <input ref="file" type="file" :name="Props.field" :accept="Props.accept" @input="changeFile">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" >
import type { ComputedRef, Ref, StyleValue } from 'vue'
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { createCutImg, getBase64, getRange, uploadFile } from './utils'
import type { MRef, RefElement, Size, SizeStyle } from './type'
import { useBackImgOperate, useSelectOperate } from './useOperate'
interface AvatarUploadProps {
  avatar?: string
  url: string
  field?: string
  headers?: Record<string, any>
  data?: Record<string, any>
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
  method?: 'post' | 'get'
  accept?: string
  fixed?: boolean
  customRequest?: (file: File) => void
  befoureUpload?: (file: File) => boolean | Promise<boolean>
  onSuccess?: (file: File, respose: any) => void
  onError?: (file: File, err: Error) => void
  onClose?: () => void
}
const Props = withDefaults(defineProps<AvatarUploadProps>(), {
  field: 'avatar',
  width: 300,
  height: 300,
  withCredentials: false,
  selectSize: 300,
  accept: 'image/*',
  method: 'post',
  fixed: true,
})
const PREVIEW_ZOOM = 0.65
// const Emits = defineEmits<{
//   (e: 'customUpload', file: File): void
// }>()
const avatar: Ref<string> = ref(Props.avatar)
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
const bgAvatar: MRef<HTMLImageElement> = ref(null)
// 图片改动就重置尺寸
watch(bgAvatar, () => {
  if (bgAvatar.value?.width)
    initImgSize()
}, {
  immediate: true,
})
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
// 把图片变为object-fit: cover;的形式 填充满不拉伸
function initImgSize() {
  // 挂载dom之后才能获得正确的宽高
  nextTick(() => {
    const el = bgAvatar.value
    // 图片加载完后才能获取宽高
    el.onload = () => {
      const width = el.naturalWidth
      const height = el.naturalHeight
      if (width / height > editBoxWidth / editBoxHeight) {
        bgImgZoom.value = editBoxHeight / height
        imgSize.height = height
        imgSize.width = width
      }
      else {
        bgImgZoom.value = editBoxWidth / width
        imgSize.height = height
        imgSize.width = width
      }
      baImgX.value = 0
      baImgY.value = 0
    }
  })
}
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
const previewBoxSizeStyle: ComputedRef<StyleValue> = computed(() => {
  return {
    width: `${initSelectSize * PREVIEW_ZOOM}px`,
    height: `${initSelectSize * PREVIEW_ZOOM}px`,
  }
})
// 预览图片的样式
const previewImgStyle: ComputedRef<StyleValue> = computed(() => {
  const zoom = initSelectSize * PREVIEW_ZOOM / selectBoxSize.value
  return {
    width: `${imgSize.width * zoom * bgImgZoom.value}px`,
    height: `${imgSize.height * zoom * bgImgZoom.value}px`,
    left: `${(baImgX.value - selectX.value) * zoom}px`,
    top: `${(baImgY.value - selectY.value) * zoom}px`,
    transform: `rotate(${imgRotate.value}deg)`,
  }
})

const file: MRef<HTMLInputElement> = ref(null)
function changeFile(e: Event) {
  const file = e.target as HTMLInputElement
  const reader = new FileReader()
  reader.onload = (e: ProgressEvent<FileReader>) => {
    const url = (e.target as FileReader).result
    if (url) {
      avatar.value = url as string
      initImgSize()
    }
  }
  reader.readAsDataURL(file.files[0])
}
async function upload() {
  const formData = new FormData()
  const blob = await getImgData()
  formData.append(Props.field, blob)
  const file = new File([blob], 'avatar.png', { type: 'image/png' })
  avatar.value = await getBase64(blob)
  if (Props.customRequest) {
    await Props.customRequest(file)
    return
  }
  if (Props.befoureUpload) {
    const result = await Props.befoureUpload(file)
    if (!result)
      return
  }
  uploadFile(formData, Props.url, Props.method, { headers: Props.headers, data: Props.data }).then((res) => {
    Props.onSuccess(file, res)
  }).catch((err) => {
    Props.onError(file, err)
  })
}
const cutImg = createCutImg()
function getImgData() {
  const range = getRange({
    left: selectX.value,
    top: selectY.value,
    width: selectBoxSize.value,
    height: selectBoxSize.value,
  }, {
    left: baImgX.value,
    top: baImgY.value,
    width: imgSize.width,
    height: imgSize.height,
    zoom: bgImgZoom.value,
  })
  return cutImg(avatar.value, range)
}

</script>

<style scoped >
.avatar-upload-fade {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-upload{
  border-radius: 10px;
  background-color: #fff;
  padding: 5px 15px;
  user-select: none;
  z-index: 3;
}
.avatar-upload-fixed{
  position: fixed;
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
.avatar-upload-close{
  font-size: 18px;
  cursor: pointer;
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
  background-image:url('./no.png');
  background-repeat: repeat;
}
.edit-fade{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
  margin-bottom: 20px;
}
.preview-radius{
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}
.preview-radius>img{
  position: absolute;
}
.preview-square{
  overflow: hidden;
  position: relative;
}
.preview-square>img{
  position: absolute;
}

.avatar-upload-operation{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: red;
  height: 20px;
  margin-right: 10px;
}
.upload-operation-close{
  display: flex;
  align-items: center;
}
.icon-rotate{
  color: red;
  fill:currentColor;
}
.avatar-upload-actions{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
</style>
