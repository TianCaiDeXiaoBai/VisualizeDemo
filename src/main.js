/*
 * @Author: wujian
 * @Date: 2022-08-15 09:16:44
 * @LastEditors: wujian
 * @LastEditTime: 2022-09-21 11:07:25
 * @FilePath: \case\src\main.js
 * @Description:
 * @email: 281919544@qq.com
 * Copyright (c) 2022 by wujian 281919544@qq.com, All Rights Reserved.
 */
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import 'animate.css';
import router from './router';
import store from './store';
const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');
