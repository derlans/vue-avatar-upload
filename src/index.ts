import VueAvatarUpload from './index.vue'
const name = 'VueAvatarUpload'
VueAvatarUpload.install = function(Vue: any) {
  Vue.component(name, VueAvatarUpload)
}
export default VueAvatarUpload
