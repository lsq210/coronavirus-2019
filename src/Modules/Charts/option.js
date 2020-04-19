import moment from 'moment';

const dates = [];
const startDate = moment('2019-12-01');
const endDate = new moment();
const duration = parseInt(moment.duration(endDate.diff(startDate)).asDays());
for (var i = 0; i < duration; i++) {
  const str = startDate.format('YYYY-MM-DD');
  dates.push(str);
  startDate.add(1, 'days');
}

export default function getOption(allData) {
  return {
    color: ['#fb6767', '#28da6f', '#949fa5'],
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
      data: ['确诊', '治愈', '死亡'],
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
        data: dates,
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
        areaStyle: {},
        data: allData.map(x => x.confirmed)
      },
      {
        name: '治愈',
        type: 'line',
        // stack: '总量',
        areaStyle: {},
        data: allData.map(x => x.cured)
      },
      {
        name: '死亡',
        type: 'line',
        areaStyle: {},
        data: allData.map(x => x.dead)
      }
    ]
  }
}