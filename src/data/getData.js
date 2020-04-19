import axios from 'axios';

function parseCSV(csv, dtype) {
  var lines = csv.split('\n');
  var keys = lines[0].split(',');
  return lines.slice(1).map(function (line) {
    var values = line.split(',');
    var o = {};
    keys.forEach(function (key, index) {
      var type = dtype ? dtype[key] : undefined;
      o[key] = type ? type(values[index]) : values[index];
    });
    return o;
  });
}
const getData = async () => {
  // 本地数据
  const allData = require('./Wuhan-2019-nCoV.json');
  // 调用实时接口
  // const { data: csv } = await axios.get('https://raw.githubusercontent.com/canghailan/Wuhan-2019-nCoV/master/Wuhan-2019-nCoV.csv')
  // let allData = parseCSV(csv, { confirmed: Number, suspected: Number, cured: Number, dead: Number });
  return {
    // 国家级数据
    countryData: allData.filter(e => !e.province),
    // 市级数据
    cityData: allData.filter(e => e.province && !e.city)
  };
}

export default getData;