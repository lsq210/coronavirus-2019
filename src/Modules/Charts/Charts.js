import React, { Component } from 'react';
import ReactEcharts from "echarts-for-react";
import './Charts.scss'

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {
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
          data: ['确诊', '死亡', '治愈'],
          textStyle: {
            color: '#fff'
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '2%',
          top: '24%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            }
          }
        ],
        series: [
          {
            name: '确诊',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '治愈',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '死亡',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
          }
        ]
      }
    }
  };
  render() {
    return (
      <div className="charts">
        <ReactEcharts
          ref='echartsInstance'
          option={this.state.option}
          style={{ height: '140px', width: '380px' }} />
      </div>
    )
  };
};

export default Charts