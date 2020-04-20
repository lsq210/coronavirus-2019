import axios from 'axios';
// import allData from './Wuhan-2019-nCoV.json';
// import csv from './Wuhan-2019-nCoV.csv'

function parseCSV(csv, dtype) {
  var lines = csv.split('\n');
  var keys = lines[0].split(',');
  return lines.slice(1).map(function (line) {
    var values = line.split(',');
    var o = {};
    keys.forEach(function (key, index) {
      key = key.trim();
      var type = dtype[key];
      o[key] = type ? type(values[index]) : values[index];
    });
    return o;
  });
}
const getData = async () => {
  // 调用实时接口
  // const { data: csv } = await axios.get('https://raw.githubusercontent.com/canghailan/Wuhan-2019-nCoV/master/Wuhan-2019-nCoV.csv')
  // 本地数据
  const { data: csv } = await axios.get('/data/Wuhan-2019-nCoV.csv')
  let allData = parseCSV(csv, { confirmed: Number, cured: Number, dead: Number });
  // console.log('csv', csv)
  // console.log('allData', allData)
  return {
    // 国家级数据
    countryData: allData.filter(e => !e.province),
    // 省级数据
    cityData: allData.filter(e => e.province && !e.city)
  };
}

export default getData;