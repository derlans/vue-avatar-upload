import { resolve } from 'path'
import type { BuildOptions } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}
const buildConfig: Record<string, BuildOptions> = {
  production: {
    outDir: 'lib',
    lib: {
      entry: pathResolve('src/index.ts'), // 入口文件
      name: 'lib',
      fileName: format => `index.${format}.js`, // 文件名
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
      // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  preview: {
    outDir: 'demo',
    rollupOptions: {
      input: pathResolve('index.html'),
    },

  },
}
// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [vue(), dts()],
    base: './',
    resolve: {
      alias: [
        {
          find: /\/#\//,
          replacement: `${pathResolve('types')}/`,
        },
        {
          find: '@',
          replacement: `${pathResolve('src')}/`,
        },
      ],
      dedupe: ['vue'],
    },
    build: buildConfig[mode],
  })
}
