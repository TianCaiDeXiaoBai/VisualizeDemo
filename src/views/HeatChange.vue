<!--
 * @Author: wujian
 * @Date: 2022-08-26 13:27:12
 * @LastEditors: wujian
 * @LastEditTime: 2022-09-21 09:15:22
 * @FilePath: \3d_case\cases\src\views\HeatChange.vue
 * @Description: 
 * @email: 281919544@qq.com
 * Copyright (c) 2022 by wujian 281919544@qq.com, All Rights Reserved. 
-->
<script setup>
  import { onMounted, ref, reactive } from 'vue';
  import lodash from 'lodash';
  import { formatDate, getWeekDate } from '../utils/utils';
  import * as echarts from 'echarts';
  import Echarts from '../components/echarts.vue';
  import { Wcanvas } from '../utils/canvasEngine';
  // 线条偏移量
  let offset = 0;
  // 线条速度
  const speed = 1.2;

  // 水位最大值
  const waterLevelMax = 300;

  // 水箱水位
  let waterLevel = waterLevelMax;
  // canvas 标签组
  const labels = [
    {
      position: {
        x: 1200,
        y: 250,
        w: 300,
        h: 100,
        r: 16,
        color: 'rgba(51,6,51,0.7)'
      },
      content: [
        {
          text: '瞬时流量',
          x: 1280,
          y: 310,
          font: '28px Arial',
          color: '#fff'
        },
        {
          text: '45.1',
          x: 1370,
          y: 310,
          font: '28px Arial',
          color: 'red'
        },
        {
          text: 'm³/s',
          x: 1430,
          y: 310,
          font: '28px Arial',
          color: '#fff'
        }
      ]
    },
    {
      position: {
        x: 1200,
        y: 460,
        w: 300,
        h: 100,
        r: 16,
        color: 'rgba(51,6,51,0.7)'
      },
      content: [
        {
          text: '瞬时流量',
          x: 1280,
          y: 520,
          font: '28px Arial',
          color: '#fff'
        },
        {
          text: '45.1',
          x: 1370,
          y: 520,
          font: '28px Arial',
          color: 'red'
        },
        {
          text: 'm³/s',
          x: 1430,
          y: 520,
          font: '28px Arial',
          color: '#fff'
        }
      ]
    },
    {
      position: {
        x: 1800,
        y: 250,
        w: 300,
        h: 100,
        r: 16,
        color: 'rgba(51,6,51,0.7)'
      },
      content: [
        {
          text: '实时水压',
          x: 1880,
          y: 310,
          font: '28px Arial',
          color: '#fff'
        },
        {
          text: '45.1',
          x: 1970,
          y: 310,
          font: '28px Arial',
          color: 'red'
        },
        {
          text: 'MPa',
          x: 2030,
          y: 310,
          font: '28px Arial',
          color: '#fff'
        }
      ]
    },
    {
      position: {
        x: 2000,
        y: 700,
        w: 300,
        h: 100,
        r: 16,
        color: 'rgba(51,6,51,0.7)'
      },
      content: [
        {
          text: '回水压力',
          x: 2080,
          y: 760,
          font: '28px Arial',
          color: '#fff'
        },
        {
          text: '45.1',
          x: 2170,
          y: 760,
          font: '28px Arial',
          color: 'red'
        },
        {
          text: 'MPa',
          x: 2230,
          y: 760,
          font: '28px Arial',
          color: '#fff'
        }
      ]
    },
    {
      position: {
        x: 1200,
        y: 1530,
        w: 300,
        h: 100,
        r: 16,
        color: 'rgba(51,6,51,0.7)'
      },
      content: [
        {
          text: '瞬时热量',
          x: 1280,
          y: 1590,
          font: '28px Arial',
          color: '#fff'
        },
        {
          text: '45.1',
          x: 1370,
          y: 1590,
          font: '28px Arial',
          color: 'red'
        },
        {
          text: 'GJ',
          x: 1420,
          y: 1590,
          font: '28px Arial',
          color: '#fff'
        }
      ]
    },
    {
      position: {
        x: 2200,
        y: 1460,
        w: 300,
        h: 100,
        r: 16,
        color: 'rgba(51,6,51,0.7)'
      },
      content: [
        {
          text: '水箱液位',
          x: 2280,
          y: 1520,
          font: '28px Arial',
          color: '#fff'
        },
        {
          text: '45.1',
          x: 2370,
          y: 1520,
          font: '28px Arial',
          color: 'red'
        },
        {
          text: 'm',
          x: 2430,
          y: 1520,
          font: '28px Arial',
          color: '#fff'
        }
      ]
    },
    {
      position: {
        x: 2750,
        y: 1280,
        w: 300,
        h: 100,
        r: 16,
        color: 'rgba(51,6,51,0.7)'
      },
      content: [
        {
          text: '循环泵频率',
          x: 2840,
          y: 1340,
          font: '28px Arial',
          color: '#fff'
        },
        {
          text: '45.1',
          x: 2960,
          y: 1340,
          font: '28px Arial',
          color: 'red'
        },
        {
          text: 'Hz',
          x: 3020,
          y: 1340,
          font: '28px Arial',
          color: '#fff'
        }
      ]
    },
    {
      position: {
        x: 2200,
        y: 1000,
        w: 300,
        h: 100,
        r: 16,
        color: 'rgba(51,6,51,0.7)'
      },
      content: [
        {
          text: '回水温度',
          x: 2280,
          y: 1060,
          font: '28px Arial',
          color: '#fff'
        },
        {
          text: '45.1',
          x: 2370,
          y: 1060,
          font: '28px Arial',
          color: 'red'
        },
        {
          text: '℃',
          x: 2430,
          y: 1060,
          font: '28px Arial',
          color: '#fff'
        }
      ]
    },
    {
      position: {
        x: 2500,
        y: 630,
        w: 300,
        h: 100,
        r: 16,
        color: 'rgba(51,6,51,0.7)'
      },
      content: [
        {
          text: '补水泵频率',
          x: 2600,
          y: 690,
          font: '28px Arial',
          color: '#fff'
        },
        {
          text: '45.1',
          x: 2710,
          y: 690,
          font: '28px Arial',
          color: 'red'
        },
        {
          text: 'Hz',
          x: 2760,
          y: 690,
          font: '28px Arial',
          color: '#fff'
        }
      ]
    }
  ];
  const scale = ref(1);

  /**
   * @author: wujian
   * @description: 获取缩放比例
   * @return {*}
   */
  function getScale() {
    const width = 1920,
      height = 1080;
    let ww = document.body.clientWidth / width;
    let wh = document.body.clientHeight / height;
    return ww < wh ? ww : wh;
  }
  /**
   * @author: wujian
   * @description: 设置缩放比例
   * @return {*}
   */
  function setScale() {
    scale.value = getScale();
  }
  /**
   * echarts 画图数据
   */

  const ec1Option = reactive({
    xAxis: {
      data: [
        '设备1',
        '设备2',
        '设备3',
        '设备4',
        '设备5',
        '设备6',
        '设备7',
        '设备8',
        '设备9',
        '设备10'
      ],
      axisLabel: {
        color: '#83bff6'
      },

      axisTick: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,0.3)'
        }
      },
      axisLine: {
        show: true
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#83bff6'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,0.03)'
        }
      }
    },

    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ]),
          barBorderRadius: [10, 10, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        barMaxWidth: 10,
        data: [12, 10, 6, 10, 8, 19, 20, 20, 16, 12]
      }
    ]
  });
  function Pie() {
    let dataArr = [];
    for (var i = 0; i < 150; i++) {
      if (i % 2 === 0) {
        dataArr.push({
          name: (i + 1).toString(),
          value: 50,
          itemStyle: {
            normal: {
              color: '#00AFFF',
              borderWidth: 0,
              borderColor: 'rgba(0,0,0,0)'
            }
          }
        });
      } else {
        dataArr.push({
          name: (i + 1).toString(),
          value: 100,
          itemStyle: {
            normal: {
              color: 'rgba(0,0,0,0)',
              borderWidth: 0,
              borderColor: 'rgba(0,0,0,0)'
            }
          }
        });
      }
    }
    return dataArr;
  }
  const ec2Option = reactive({
    title: {
      text: '设备安全指数',
      textStyle: {
        color: '#11f6f2'
      },
      left: 'center',
      bottom: '20'
    },
    series: [
      {
        type: 'liquidFill',
        color: [
          {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 1,
                color: ['#27e5f1'] // 0% 处的颜色
              },
              {
                offset: 0,

                color: ['#6a7feb'] // 1% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        ],
        data: [0.9, 0.91],
        label: {
          show: true,
          color: '#294D99',
          insideColor: '#fff',
          fontSize: 20,
          fontWeight: 'bold',
          align: 'center',
          baseline: 'middle',
          position: 'inside'
        },
        outline: {
          show: true,
          borderDistance: 0,
          itemStyle: {
            color: 'none',
            borderColor: '#ffffff',
            borderWidth: 2,
            shadowBlur: 0,
            shadowColor: 'rgba(255, 255, 255, 1)'
          }
        },
        backgroundStyle: {
          color: 'rgba(0,0,0,0)'
        }
      },
      {
        type: 'pie',
        z: 1,
        center: ['50%', '50%'],
        radius: ['60%', '61%'], // 控制外圈圆的粗细
        hoverAnimation: false,
        data: [
          {
            name: '',
            value: 500,
            labelLine: {
              show: false
            },
            itemStyle: {
              color: '#00AFFF'
            },
            emphasis: {
              labelLine: {
                show: false
              },
              itemStyle: {
                color: '#00AFFF'
              }
            }
          }
        ]
      },
      {
        type: 'pie',
        zlevel: 0,
        silent: true,
        radius: ['62%', '64%'],
        z: 1,
        label: {
          normal: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: Pie()
      }
    ]
  });

  const ec3Option = reactive({
    title: {
      text: '能耗指数',
      textStyle: {
        color: '#11f6f2'
      },
      left: 'center',
      bottom: '20'
    },
    series: [
      {
        type: 'liquidFill',
        color: [
          {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 1,
                color: ['#27e5f1'] // 0% 处的颜色
              },
              {
                offset: 0,

                color: ['#6a7feb'] // 1% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        ],
        data: [0.66, 0.72],
        label: {
          show: true,
          color: '#294D99',
          insideColor: '#fff',
          fontSize: 20,
          fontWeight: 'bold',
          align: 'center',
          baseline: 'middle',
          position: 'inside'
        },
        outline: {
          show: true,
          borderDistance: 0,
          itemStyle: {
            color: 'none',
            borderColor: '#ffffff',
            borderWidth: 2,
            shadowBlur: 0,
            shadowColor: 'rgba(255, 255, 255, 1)'
          }
        },
        backgroundStyle: {
          color: 'rgba(0,0,0,0)'
        }
      },
      {
        type: 'pie',
        z: 1,
        center: ['50%', '50%'],
        radius: ['60%', '61%'], // 控制外圈圆的粗细
        hoverAnimation: false,
        data: [
          {
            name: '',
            value: 500,
            labelLine: {
              show: false
            },
            itemStyle: {
              color: '#00AFFF'
            },
            emphasis: {
              labelLine: {
                show: false
              },
              itemStyle: {
                color: '#00AFFF'
              }
            }
          }
        ]
      },
      {
        type: 'pie',
        zlevel: 0,
        silent: true,
        radius: ['62%', '64%'],
        z: 1,
        label: {
          normal: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: Pie()
      }
    ]
  });
  let ec4Datas = {
    legends: {
      data: ['自流井流量', '循环泵流量'],
      colors: ['#599EE9FF', '#F3CE30FF']
    },
    datas: [
      {
        name: '自流井流量',
        colors: ['#2661DD80', '#0B102600'],
        data: [25, 40, 28, 36, 33, 30, 38]
      },
      {
        name: '循环泵流量',
        colors: ['#03EBFC80', '#03EBFC00'],
        data: [26, 30, 32, 28, 36, 38, 40]
      }
    ],
    xData: ['11/01', '11/02', '11/03', '11/04', '11/05', '11/06', '11/07']
  };
  const ec4Option = reactive({
    color: ['#599EE9FF', '#03EBFCFF'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },

    toolbox: {
      feature: {
        // saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        axisLine: {
          show: false,
          lineStyle: {
            color: '#41CDF9'
          }
        },
        boundaryGap: false,
        data: []
      }
    ],
    yAxis: [
      {
        type: 'value',
        show: false,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#41CDF9'
          }
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: []
  });
  let tmpDate = new Date().getTime();
  for (let i = 0; i < 1; i++) {
    ec4Option.xAxis[0].data.push(formatDate(tmpDate + i * 1000, 'hh:mm:ss'));
  }

  ec4Datas.datas.forEach((data) => {
    ec4Option.series.push({
      name: data.name,
      type: 'line',
      // stack: 'Total',
      smooth: true,
      showSymbol: true,
      areaStyle: {
        opacity: 1,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: data.colors[0]
          },
          {
            offset: 1,
            color: data.colors[1]
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      lineStyle: {
        number: 1
      },
      symbolSize: 10,
      symbol: 'emptyCircle',
      data: [15]
    });
  });

  const time = ref('');
  const date = ref('');
  const week = ref('');
  function dataMock() {
    // 轮询数据
    setInterval(() => {
      ec1Option.series[0].data = ec1Option.series[0].data.map((item) => {
        return parseInt(Math.random() * 5 + 10);
      });
      week.value = getWeekDate();
      date.value = formatDate(new Date().getTime(), 'yyyy年MM月dd日');
      time.value = formatDate(new Date().getTime(), 'hh:mm:ss');

      ec4Option.xAxis[0].data.push(time.value);
      ec4Option.series[0].data.push((Math.random() * 100).toFixed(2));
      ec4Option.series[1].data.push((Math.random() * 100).toFixed(2));

      if (ec4Option.xAxis[0].data.length > 10) {
        ec4Option.xAxis[0].data.shift();
        ec4Option.series[0].data.shift();
        ec4Option.series[1].data.shift();
      }
      labels.map((label) => {
        label.content[1].text = (Math.random() * 20 + 10).toFixed(1);
      });
    }, 1000);
  }
  onMounted(() => {
    setScale();
    window.addEventListener('resize', lodash.debounce(setScale, 150));
    /**
     * canvas 画图
     */
    const canvas = new Wcanvas('canvas');
    const bgCanvas = new Wcanvas('canvas-bg');
    const imgsCanvas = new Wcanvas('canvas-imgs');
    const draw = () => {
      canvas.clear();
      offset += speed;
      if (offset > 80) {
        offset = 0;
      }
      // 画标题
      canvas.drawTitle({
        text: '海拔热换站监控系统',
        color: 'rgba(255,0,98,1)'
      });
      // 画边框
      canvas.drawBorder();
      // 画管道
      const pipes = [
        [
          {
            x: 1200,
            y: 400
          },
          {
            x: 3600,
            y: 400
          }
        ],
        [
          {
            x: 1200,
            y: 600
          },
          {
            x: 2500,
            y: 600
          }
        ],
        [
          {
            x: 2550,
            y: 540
          },
          {
            x: 3600,
            y: 540
          }
        ],
        [
          {
            x: 1800,
            y: 400
          },
          {
            x: 1800,
            y: 800
          }
        ],
        [
          {
            x: 1800,
            y: 850
          },
          {
            x: 3600,
            y: 850
          }
        ],
        [
          {
            x: 1500,
            y: 620
          },
          {
            x: 1500,
            y: 1200
          }
        ],
        [
          {
            x: 1550,
            y: 1200
          },
          {
            x: 3600,
            y: 1200
          }
        ],
        [
          {
            x: 1200,
            y: 1500
          },
          {
            x: 2000,
            y: 1500
          }
        ],
        [
          {
            x: 2050,
            y: 1620
          },
          {
            x: 2200,
            y: 1620
          }
        ],
        [
          {
            x: 1600,
            y: 1800
          },
          {
            x: 1600,
            y: 1520
          }
        ],
        [
          {
            x: 1400,
            y: 1800
          },
          {
            x: 1600,
            y: 1800
          }
        ],
        [
          {
            x: 2020,
            y: 1520
          },
          {
            x: 2020,
            y: 1620
          }
        ],
        [
          {
            x: 2500,
            y: 1800
          },
          {
            x: 2700,
            y: 1800
          }
        ],
        [
          {
            x: 2750,
            y: 1800
          },
          {
            x: 2750,
            y: 1500
          }
        ],
        [
          {
            x: 2750,
            y: 1700
          },
          {
            x: 3000,
            y: 1700
          }
        ],
        [
          {
            x: 2750,
            y: 1474
          },
          {
            x: 3000,
            y: 1474
          }
        ],
        [
          {
            x: 3050,
            y: 1416
          },
          {
            x: 3300,
            y: 1416
          }
        ],
        [
          {
            x: 3050,
            y: 1640
          },
          {
            x: 3500,
            y: 1640
          }
        ],
        [
          {
            x: 3300,
            y: 1420
          },
          {
            x: 3300,
            y: 560
          }
        ],
        [
          {
            x: 3500,
            y: 1640
          },
          {
            x: 3500,
            y: 860
          }
        ]
      ];
      pipes.forEach((pipe) => {
        canvas.drawPipe(
          {
            pipeColor: 'rgba(0,56,87,0.9)',
            lineColor: 'rgba(0,194,243,1)',
            lineWidth: 12,
            lineLong1: 28,
            lineLong2: 12,
            offset,
            pipeWidth: 32
          },
          pipe
        );
      });

      // 画水塔1
      waterLevel -= 2;
      if (waterLevel < 0) {
        waterLevel = waterLevelMax;
      }

      canvas.drawWatherTower(waterLevel, {
        waterStartColor: 'rgba(0,105,168,0)',
        waterStopColor: 'rgba(0,105,168,1)',
        towerColor: 'rgba(0,105,168,0.8)',
        towerBgColor: 'rgba(0,105,168,0.2)',
        x: 2200,
        y: 1600,
        w: 300,
        h: waterLevelMax
      });
      // 画水塔2
      canvas.drawWatherTower(waterLevel, {
        waterStartColor: 'rgba(0,105,168,0)',
        waterStopColor: 'rgba(0,105,168,1)',
        towerColor: 'rgba(0,105,168,0.8)',
        towerBgColor: 'rgba(0,105,168,0.2)',
        x: 1200,
        y: 1640,
        w: 200,
        h: waterLevelMax
      });

      // 画label
      labels.forEach((label) => {
        canvas.drawLabelPanel(label.position, label.content);
      });

      requestAnimationFrame(draw);
    };
    draw();
    // 背景图
    bgCanvas.drawImg('imgs/bimbg.jpg', {
      x: 0,
      y: 0,
      w: bgCanvas.canvas.width,
      h: bgCanvas.canvas.height
    });
    // 天气
    imgsCanvas.drawImg('imgs/cloud.png', {
      x: 3560,
      y: 80,
      w: 130,
      h: 100
    });
    // 冷却泵1
    imgsCanvas.drawImg('imgs/cool_beng.png', {
      x: 2450,
      y: 494,
      w: 150,
      h: 150
    });
    // 冷却泵2
    imgsCanvas.drawImg('imgs/cool_beng.png', {
      x: 2960,
      y: 1370,
      w: 150,
      h: 150
    });
    // 冷却泵3
    imgsCanvas.drawImg('imgs/cool_beng.png', {
      x: 2960,
      y: 1594,
      w: 150,
      h: 150
    });
    // 直角管道1
    imgsCanvas.drawImg('imgs/pipe1.png', {
      x: 1764,
      y: 782,
      w: 100,
      h: 100
    });

    // 直角管道2
    imgsCanvas.drawImg('imgs/pipe1.png', {
      x: 1464,
      y: 1134,
      w: 100,
      h: 100
    });
    // 直角管道3
    imgsCanvas.drawImg('imgs/pipe2.png', {
      x: 1532,
      y: 1734,
      w: 100,
      h: 100
    });
    // 直角管道4
    imgsCanvas.drawImg('imgs/pipe3.png', {
      x: 1954,
      y: 1470,
      w: 100,
      h: 100
    });
    // 直角管道5
    imgsCanvas.drawImg('imgs/pipe1.png', {
      x: 1982,
      y: 1550,
      w: 100,
      h: 100
    });
    // 直角管道6
    imgsCanvas.drawImg('imgs/pipe2.png', {
      x: 2680,
      y: 1736,
      w: 100,
      h: 100
    });

    // 直角管道7
    imgsCanvas.drawImg('imgs/pipe4.png', {
      x: 2720,
      y: 1440,
      w: 100,
      h: 100
    });
    // 直角管道8
    imgsCanvas.drawImg('imgs/pipe2.png', {
      x: 3232,
      y: 1350,
      w: 100,
      h: 100
    });
    // 直角管道9
    imgsCanvas.drawImg('imgs/pipe2.png', {
      x: 3434,
      y: 1574,
      w: 100,
      h: 100
    });
    // 水表1
    imgsCanvas.drawImg('imgs/shuibiao.png', {
      x: 1820,
      y: 340,
      w: 50,
      h: 50
    });
    dataMock();
  });
</script>
<template>
  <div class="container">
    <div class="screen" :style="`transform: scale(${scale}) translate(-50%, -50%);`">
      <canvas id="canvas" width="3840" height="2160"></canvas>
      <canvas canvas id="canvas-bg" width="3840" height="2160"></canvas>
      <canvas canvas id="canvas-imgs" width="3840" height="2160"></canvas>
      <div class="echarts-panel">
        <div class="date-time">
          <span>
            {{ time }}
          </span>
          <span class="ml20">{{ date }}</span>
        </div>
        <div class="card mt40">
          <div class="card-title">设备故障</div>
          <div class="divider">
            <div class="light"></div>
          </div>
          <div style="height: 220px">
            <Echarts boxId="ec1" :option="ec1Option"></Echarts>
          </div>
        </div>
        <div class="card mt40">
          <div class="card-title">安全指数</div>
          <div class="divider">
            <div class="light"></div>
          </div>
          <div style="height: 260px; width: 100%" class="flex">
            <div style="height: 100%; width: 50%">
              <Echarts boxId="ec2" :option="ec2Option"></Echarts>
            </div>
            <div style="height: 100%; width: 50%">
              <Echarts boxId="ec3" :option="ec3Option"></Echarts>
            </div>
          </div>
        </div>
        <div class="card mt40">
          <div class="card-title">实时流量</div>
          <div class="divider">
            <div class="light"></div>
          </div>
          <div style="height: 220px">
            <Echarts boxId="ec4" :option="ec4Option"></Echarts>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .container {
    background-color: rgb(3, 11, 24);
    position: relative;
    height: 100vh;
    width: 100vw;
  }

  .screen {
    width: 1920px;
    height: 1080px;
    padding: 20px;
    transform-origin: 0 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transition: 0.3s;
  }

  #canvas,
  #canvas-bg,
  #canvas-imgs {
    position: absolute;
    left: 0;
    top: 0;
    width: 1920px;
    height: 1080px;
    z-index: 3;
  }

  #canvas-bg {
    z-index: 2;
  }

  #canvas-imgs {
    z-index: 4;
  }

  .echarts-panel {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 4;
    height: 100%;
    width: 600px;
    padding: 40px 80px;
  }

  .date-time {
    height: 40px;
    background-color: rgba(0, 105, 168, 0.3);
    font-size: 32px;
    color: #fff;
    line-height: 40px;
    padding: 0 20px;
  }

  .date-time span:last-child {
    font-size: 26px;
    color: #999;
  }

  .card {
    border: 1px solid rgba(50, 60, 84, 0.8);
    background-color: rgba(82, 206, 255, 0.01);
  }

  .card .card-title {
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    color: #e3fcfc;
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
    background: linear-gradient(145deg, #0a3648, rgba(17, 246, 242, 0) 30%);
    overflow: hidden;
  }

  .card .divider {
    height: 1px;
    margin: 0 16px;
    background: #3a4556;
    position: relative;
    overflow: hidden;
  }

  .card .divider .light {
    position: absolute;
    width: 20px;
    left: 0;
    top: 0;
    bottom: 0;
    background: #11f6f2;
  }
</style>
