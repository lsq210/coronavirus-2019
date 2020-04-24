import axios from 'axios';
import moment from 'moment';

function parseCSV(csv, dtype) {
  var lines = csv.split('\n');
  var keys = lines[0].split(',');
  return lines.slice(1).map(function (line) {
    var values = line.split(',');
    var o = {};
    keys.forEach(function (key, index) {
      if (key === 'date') {
        o[key] = moment(values[index]).format('YYYY-MM-DD')
      } else {
        key = key.trim();
        var type = dtype[key];
        o[key] = type ? type(values[index]) : values[index];
      }
    });
    return o;
  });
}
const getData = async () => {
  // 调用实时接口
  // const { data: csv } = await axios.get('https://raw.githubusercontent.com/canghailan/Wuhan-2019-nCoV/master/Wuhan-2019-nCoV.csv')
  // 本地数据
  const { data: csv } = await axios.get('/data/Wuhan-2019.csv')
  let allData = parseCSV(csv, { confirmed: Number, cured: Number, dead: Number });
  return {
    // 国家级数据
    countryData: allData.filter(e => !e.province),
    // 省级数据
    cityData: allData.filter(e => e.province && !e.city)
  };
}

export default getData;