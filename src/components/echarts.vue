<!--
 * @Author: wujian
 * @Date: 2022-08-17 16:35:12
 * @LastEditors: wujian
 * @LastEditTime: 2022-09-06 13:54:06
 * @FilePath: \3d_case\cases\src\components\echarts.vue
 * @Description: 
 * @email: 281919544@qq.com
 * Copyright (c) 2022 by wujian 281919544@qq.com, All Rights Reserved. 
-->
<script setup>
  // @ is an alias to /src
  import * as echarts from 'echarts';
  import 'echarts-liquidfill';
  import { nextTick, watch } from 'vue';

  let props = defineProps({
    boxId: String,
    width: String | Number,
    height: String | Number,
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  });

  // const emit = defineEmits(["price-change", "update:modelValue"]);
  // emit('price-change', (Number(price) + 20).toFixed(2));
  let myChart = null;
  nextTick(() => {
    myChart = echarts.init(document.getElementById(props.boxId));
    myChart.setOption(props.option);
  });

  watch(props.option, (newOption) => {
    myChart.setOption(newOption);
  });

  const open = () => {};
  defineExpose({ open });
</script>
<template>
  <div class="clearfix echart" style="width: 100%; height: 100%">
    <div :id="boxId" class="echart-box" style="width: 100%; height: 100%"></div>
  </div>
</template>

<style scoped></style>
