<!--
 * @Author: wujian
 * @Date: 2022-08-12 09:02:30
 * @LastEditors: wujian
 * @LastEditTime: 2022-09-21 09:19:57
 * @FilePath: \3d_case\cases\src\views\Index\Index.vue
 * @Description: 
 * @email: 281919544@qq.com
 * Copyright (c) 2022 by wujian 281919544@qq.com, All Rights Reserved. 
-->
<template>
  <div>
    <div id="dom"></div>
    <div class="container-top flex-between">
      <div class="weather algin-items">
        <img src="https://cdn.qweather.com/img/plugin/190516/icon/c/101d.png" alt="" />
        <span>多云 27～36℃</span>
        <span style="margin-left: 0.63vw">31℃</span>
        <span style="color: #909eba; margin-left: 0.63vw">空气质量：</span>
        <span>优</span>
      </div>
      <!-- <div class="center"></div> -->
      <div class="align-items date-time">
        <span class="date">{{ date }}</span>
        <span class="week">{{ week }}</span>
        <span class="time">{{ time }}</span>
      </div>
    </div>
    <view>
      <div class="left">
        <div class="card device-card wow fadeInDown" data-wow-offset="10" data-wow-duration="1s">
          <div class="card-inner">
            <div class="card-header">
              <div class="title">告警信息</div>
            </div>
            <div class="divider">
              <div class="light"></div>
            </div>
            <div class="card-mian">
              <div style="height: 100%">
                <Echarts boxId="ec1" :option="ec1Option"></Echarts>
              </div>
            </div>
          </div>
        </div>
        <div
          class="card device-sale-card mt20 wow fadeInUp"
          data-wow-offset="10"
          data-wow-duration="1s"
        >
          <div class="card-inner">
            <div class="card-header">
              <div class="title">流速信息</div>
            </div>
            <div class="divider">
              <div class="light"></div>
            </div>
            <div class="card-mian">
              <div style="height: 100%">
                <Echarts boxId="ec2" :option="ec2Option"></Echarts>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="card device-card wow fadeInDown" data-wow-offset="10" data-wow-duration="1s">
          <div class="card-inner">
            <div class="card-header">
              <div class="title">安全指数</div>
            </div>
            <div class="divider">
              <div class="light"></div>
            </div>
            <div class="card-mian flex">
              <div style="height: 100%; width: 50%">
                <Echarts boxId="ec3" :option="ec3Option"></Echarts>
              </div>
              <div style="height: 100%; width: 50%">
                <Echarts boxId="ec4" :option="ec4Option"></Echarts>
              </div>
            </div>
          </div>
        </div>
        <div
          class="card device-sale-card mt20 wow fadeInUp"
          data-wow-offset="10"
          data-wow-duration="1s"
        >
          <div class="card-inner">
            <div class="card-header">
              <div class="title">水质监控</div>
            </div>
            <div class="divider">
              <div class="light"></div>
            </div>
            <div class="card-mian">
              <div style="height: 100%">
                <Echarts boxId="ec5" :option="ec5Option"></Echarts>
              </div>
            </div>
          </div>
        </div>
      </div>
    </view>
  </div>
</template>

<script setup>
  import 'ant-design-vue/es/message/style/css';
  import { nextTick } from 'vue';
  import { onMounted } from 'vue';
  import Echarts from '@/components/echarts.vue';
  import WOW from 'wow.js';
  import { useEchartsData } from './useApi/echarts';
  import { useThreeControl } from './useApi/three';
  // echarts处理
  const { time, date, week, ec1Option, ec2Option, ec3Option, ec4Option, ec5Option } =
    useEchartsData();
  // threejs处理
  useThreeControl();
  onMounted(() => {
    nextTick(() => {
      new WOW({
        boxClass: 'wow'
      }).init();
    });
  });
</script>
<style scoped>
  .banner {
    height: 600px;
    position: relative;
  }

  .banner img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .banner .des {
    position: absolute;
    font-size: 48px;
    color: #fff;
    margin: 0 auto;
  }

  .card:before {
    left: -1px;
    border-left-width: 1px;
    border-right-width: 0;
  }

  .card:after,
  .card:before {
    content: '';
    position: absolute;
    top: -1px;
    width: 0.42vw;
    height: 0.42vw;
    border-color: #11f6f2;
    border-style: solid;
    border-top-width: 1px;
    border-bottom-width: 0;
  }

  .container {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0);
  }

  .container-screen {
    padding: 0 2.08vw 2.08vw;
    display: flex;

    background-color: rgba(255, 255, 255, 0);
  }

  #app .left {
    width: 23.96vw;
    position: fixed;
    left: 2.08vw;
    top: 6.04vw;
    z-index: 999;
  }

  #app .right {
    width: 23.96vw;
    position: fixed;
    right: 2.08vw;
    top: 6.04vw;
    z-index: 999;
  }

  .card {
    border: 1px solid rgba(50, 60, 84, 0.51);
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: rgba(82, 206, 255, 0.01);
  }

  .card .card-header {
    height: 3.07vw;
    padding: 0 1.04vw;
    display: flex;
    align-items: center;
    position: relative;
    background: linear-gradient(145deg, #0a3648, rgba(17, 246, 242, 0) 30%);
    overflow: hidden;
  }

  .card .card-inner {
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .card .card-header .title {
    font-size: 1.15vw;
    font-weight: 600;
    text-align: left;
    color: #e3fcfc;
    flex: 1;
  }

  .card .card-inner:after,
  .card .card-inner:before {
    content: '';
    position: absolute;
    bottom: -1px;
    width: 0.42vw;
    height: 0.42vw;
    border-color: #11f6f2;
    border-style: solid;
    border-top-width: 0;
    border-bottom-width: 1px;
  }

  .card .card-inner:before {
    left: -1px;
    border-left-width: 1px;
    border-right-width: 0;
  }

  .card .card-inner:after {
    right: -1px;
    border-left-width: 0;
    border-right-width: 1px;
  }

  .card:before {
    left: -1px;
    border-left-width: 1px;
    border-right-width: 0;
  }

  .card:after {
    right: -1px;
    border-left-width: 0;
    border-right-width: 1px;
  }

  .card:after,
  .card:before {
    content: '';
    position: absolute;
    top: -1px;
    width: 0.42vw;
    height: 0.42vw;
    border-color: #11f6f2;
    border-style: solid;
    border-top-width: 1px;
    border-bottom-width: 0;
  }

  .card .divider {
    height: 1px;
    margin: 0 1.04vw;
    background: #3a4556;
    position: relative;
    overflow: hidden;
  }

  .card .divider .light {
    position: absolute;
    width: 1.25vw;
    left: 0;
    top: 0;
    bottom: 0;
    background: #11f6f2;
  }

  .card-mian {
    position: relative;
    padding: 0.78vw 1.04vw;
    height: 16.5vw;
  }

  .weather {
    font-size: 1.04vw;
    color: #fff;
  }

  .weather img {
    width: auto;
    height: 1.56vw;
    margin-right: 0.31vw;
  }

  .container-top {
    background-image: url(@/assets/imgs/shuichang_title.png);
    background-size: 100% 100%;
    width: 100%;
    height: 6.04vw;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    padding: 0 2.08vw;
    color: #909eba;
    background-repeat: no-repeat;
    background-position: 50%;
    position: fixed;
    left: 0;
    top: 0;
  }

  .date-time,
  .weather {
    height: 3.31vw;
  }

  .date-time {
    color: #909eba;
    font-size: 1.04vw;
  }

  .week {
    margin-right: 1.63vw;
  }

  .date {
    margin-right: 0.63vw;
  }

  .time {
    color: #fff;
  }
</style>

<style>
  .label-name {
    color: rgb(0, 255, 255);
    height: 60px;
    font-size: 12px;
    padding: 15px;
    background: url(/textures/msg-bg.png) no-repeat;
    background-size: cover;
  }

  .label-point {
    width: 200px;
    height: 39px;
    background-position: 100px 0;
    background-image: url(/textures/line.png);
    background-repeat: no-repeat;
  }

  .label-item {
    height: 60px;
    display: inline-block;
    width: 100px;
  }

  .label-inner {
    display: flex;
    align-items: center;
  }

  .label-bottom {
    height: 122px;
  }
</style>
