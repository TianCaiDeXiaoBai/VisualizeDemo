/*
 * @Author: wujian
 * @Date: 2022-08-12 09:02:29
 * @LastEditors: wujian
 * @LastEditTime: 2022-09-21 09:42:41
 * @FilePath: \case\src\router\index.js
 * @Description:
 * @email: 281919544@qq.com
 * Copyright (c) 2022 by wujian 281919544@qq.com, All Rights Reserved.
 */
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
// import { store } from '@/store';
import layout from '../components/LayOut.vue';
// 静态路由
export const constantRoutes = [
  {
    path: '/',
    component: layout,
    redirect: '/waterPlant',
    meta: {},
    children: [
      {
        path: '/waterPlant',
        name: 'waterPlant',
        component: () => import('../views/Index/Index.vue'),
        meta: {}
      },
      {
        path: '/HeatChange',
        name: 'HeatChange',
        component: () => import('../views/HeatChange.vue'),
        meta: {}
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  scrollBehavior: () => ({
    top: 0
  }),
  routes: constantRoutes
});

//   router.beforeEach((to, from, next) => {

//   });

export default router;
