declare module 'Vue'{
  export interface GlobalComponents{
    VueAvatarUpload: typeof import('./src/index')
  }
}
