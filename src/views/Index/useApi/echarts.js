import { reactive, ref } from 'vue';
import * as echarts from 'echarts';
import { formatDate, getWeekDate } from '@/utils/utils';
export function useEchartsData() {
  // echarts数据
  const ec1Option = reactive({
    backgroundColor: 'rgba(0,0,0,0)',
    title: {
      text: '告警统计',
      textStyle: {
        color: '#11f6f2'
      }
    },
    legend: {
      top: 'bottom',
      textStyle: {
        color: '#11f6f2'
      },
      itemWidth: 10,
      itemHeight: 10
    },
    tooltip: {
      trigger: 'item'
    },
    toolbox: {
      show: false,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '告警统计',
        type: 'pie',
        radius: [50, 60],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 2
        },
        data: [
          { value: 40, name: '火警' },
          { value: 38, name: '机械故障' },
          { value: 32, name: '管道故障' },
          { value: 30, name: '其他' }
        ],
        label: {
          color: '#f1f1f1'
        }
      },
      {
        name: '告警统计',
        type: 'pie',
        radius: [50, 60],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 2
        },
        data: [
          { value: 40, name: '火警' },
          { value: 38, name: '机械故障' },
          { value: 32, name: '管道故障' },
          { value: 30, name: '其他' }
        ],
        label: {
          color: '#f1f1f1',
          position: 'center',
          formatter: '40条\n报警统计',
          lineHeight: 16
        }
      }
    ]
  });

  const ec2Option = reactive({
    title: {
      text: '流速监控',
      textStyle: {
        color: '#11f6f2'
      }
    },
    xAxis: {
      data: ['中心管道', '混合槽', '静态混合器', '沉淀池'],
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
          ])
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
        barMaxWidth: 30,
        data: [20, 40, 60, 80]
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
  const ec3Option = reactive({
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
  const ec4Option = reactive({
    title: {
      text: '水质安全指数',
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
        data: [0.99, 0.99],
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

  let ec5Datas = {
    legends: {
      data: ['溶解氧含量', '溶解二氧化碳含量'],
      colors: ['#599EE9FF', '#F3CE30FF']
    },
    datas: [
      {
        name: '溶解氧含量',
        colors: ['#2661DD80', '#0B102600'],
        data: [25, 40, 28, 36, 33, 30, 38]
      },
      {
        name: '溶解二氧化碳含量',
        colors: ['#2661DD80', '#0B102600'],
        data: [26, 30, 32, 28, 36, 38, 40]
      }
    ],
    xData: ['11/01', '11/02', '11/03', '11/04', '11/05', '11/06', '11/07']
  };
  const ec5Option = reactive({
    color: ['#599EE9FF', '#F3CE30FF'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      // icon: 'rect',
      data: ['溶解氧含量', '溶解二氧化碳含量'],
      textStyle: {
        color: '#41CDF9FF'
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
    ec5Option.xAxis[0].data.push(formatDate(tmpDate + i * 1000, 'hh:mm:ss'));
  }

  ec5Datas.datas.forEach((data) => {
    ec5Option.series.push({
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
  // 轮询数据
  setInterval(() => {
    ec1Option.series[0].data = ec1Option.series[0].data.map((item) => {
      let newItem = JSON.parse(JSON.stringify(item));
      newItem.value = parseInt(Math.random() * 100);
      return newItem;
    });
    ec1Option.series[1].data = ec1Option.series[0].data.map((item) => {
      let newItem = JSON.parse(JSON.stringify(item));
      newItem.value = parseInt(Math.random() * 100);
      return newItem;
    });
    ec2Option.series[0].data = ec1Option.series[0].data.map((item) => {
      return parseInt(Math.random() * 5 + 20);
    });
    week.value = getWeekDate();
    date.value = formatDate(new Date().getTime(), 'yyyy/MM/dd');
    time.value = formatDate(new Date().getTime(), 'hh:mm:ss');

    ec5Option.xAxis[0].data.push(time.value);
    ec5Option.series[0].data.push((Math.random() * 100).toFixed(2));
    ec5Option.series[1].data.push((Math.random() * 100).toFixed(2));

    if (ec5Option.xAxis[0].data.length > 10) {
      ec5Option.xAxis[0].data.shift();
      ec5Option.series[0].data.shift();
      ec5Option.series[1].data.shift();
    }
  }, 1000);

  return {
    time,
    date,
    week,
    ec1Option,
    ec2Option,
    ec3Option,
    ec4Option,
    ec5Option
  };
}
