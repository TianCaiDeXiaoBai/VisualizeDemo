/*
 * @Author: wujian
 * @Date: 2022-08-12 09:02:30
 * @LastEditors: wujian
 * @LastEditTime: 2022-09-21 09:02:04
 * @FilePath: \3d_case\cases\vite.config.js
 * @Description:
 * @email: 281919544@qq.com
 * Copyright (c) 2022 by wujian 281919544@qq.com, All Rights Reserved.
 */
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';
function pathResolve(dir) {
  return resolve(__dirname, '.', dir);
}

export default {
  /**
   * 在生产环境的基本公共路径。
   * @default '/'
   */
  base: '/',
  /**
   * 构建输出目录。如果目录存在，它将在构建之前被删除。
   * @default 'dist'
   */
  preview: {
    // 是否自动在浏览器打开
    // open: true,
    // 是否开启 https
    // https: false,
  },
  // 引入第三方的配置
  /* optimizeDeps: {
    include: ['moment', 'axios'],
  }, */
  resolve: {
    // 目录别名
    alias: {
      '@': pathResolve('src')
    }
  },
  // 打包后静态资源 js/css/image 存放目录，@default '_assets'
  //   assetsDir: '',
  server: {
    // 代理
    // proxy: {
    //   "/api": {
    //     target: "http://116.62.184.16/stringline-test",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },

    // 服务端渲染
    // ssr: false,
    host: '0.0.0.0',
    https: false,
    hmr: true
  },
  build: {
    outDir: 'dist'
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()]
    })
  ]
};
