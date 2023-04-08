# A vue3 ts base component for avatar upload and crop
![image](https://github.com/derlans/vue-avatar-upload/blob/master/imgs/preview.gif)
## how to use
##[demo](http://avatar-upload.derlan.top/)
### import
```
  import VueAvatarUpload from 'vue-avatar-upload';
  import 'vue-avatar-upload/lib/style.css';
```
```
  <VueAvatarUpload
    :url="UPLOAD_AVATAR_URL"
    :headers="headers"
    :avatar="userStore.avatar"
    @error="handleError"
    v-show="show"
    @close="show = false"
    @success="handleSuccess"
  />
```
## Props
```
interface AvatarUploadProps {
  /**
   * @description 初始图像src init img src
   */
  avatar?: string
  /**
   * @description 图片上传地址 upload url
   */
  url?: string
  /**
   * @description 图片上传字段名 upload field name
   */
  field?: string
  /**
   * @description 图片上传格式 upload file type
   */
  format?: string
  /**
   * @description 上传携带请求头 http request headers
   */
  headers?: Record<string, string>
  /**
   * @description 上传携带其他数据 http request data
   */
  data?: Record<string, string>
  /**
   * @description 图片框宽度  img box width
   */
  width?: number
  /**
   * @description 图片框长度  img box height
   */
  height?: number
  /**
   * @description  选择框初始大小 init select box size
   */
  selectSize?: number
  /**
   * @description 是否跨域携带携带cookie cross domain with cookie
   */
  withCredentials?: boolean
  /**
   * @description 上传方法 upload method
   */
  method?: 'POST' | 'GET'
  /**
   * @description 接受的文件类型 accept file type
   */
  accept?: string
  /**
   * @description 是否静止用户操作选择框 whether to still user operation selection box
   */
  disableSelect?: boolean
  /**
   * @description 是否可以旋转 can rotate
   */
  rotate?: boolean
  /**
   * @description 是否fixed  is fixed
   */
  fixed?: boolean
  /**
   * @description 是否展示预览 is show preview
   */
  showPreview?: boolean
  /**
   * @description 预览框大小 preview box size
   */
  previewSize?: number
  /**
   * @description 自定义文字 i18n
   */
  i18?: I18
  /**
   * @description 语言 language
   */
  lang?: 'zh-CN' | 'zh-TW' | 'en'
  /**
   * @description 自定义上传  custom upload
   */
  onCustomRequest?: (file: File) => void
  /**
   * @description 上传前钩子 返回false可以阻止上传 upload before callback if return false can prevent upload
   */
  onBefoureUpload?: (file: File) => boolean | Promise<boolean>
  /**
   * @description 上传成功钩子 upload success callback
   */
  onSuccess?: (respose: any, file: File) => void
  /**
   * @description 上传失败钩子 upload fail callback
   */
  onError?: (err: Error, file: File) => void
  /**
   * @description 点击关闭按钮 click close button
   */
  onClose?: () => void
}
```
### default value
```
  url: '',
  field: 'avatar',
  width: 300,
  height: 300,
  withCredentials: false,
  selectSize: 300,
  accept: 'image/*',
  method: 'POST',
  fixed: true,
  rotate: true,
  format: 'png',
  lang: 'zh-CN',
  showPreview: true,
  previewSize: 100,
```

## language
built-in  ``zh-CN``  |  ``zh-TW `` |  ``en``
you can use ``lang`` change the language
or use ``i18`` custom text
```
interface I18 {
  title: string
  changeAvatar: string
  rotate: string
  preview: string
  cancel: string
  confirm: string
}
```

## slots
![image](https://github.com/derlans/vue-avatar-upload/blob/master/imgs/slots.png)
