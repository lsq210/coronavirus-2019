import axios from 'axios';
import moment from 'moment';

function parseCSV(csv, dtype) {
  var lines = csv.split('\n');
  var keys = lines[0].split(',');
  return lines.slice(1).map(function (line) {
    var values = line.split(',');
    // var o = {};
    // keys.forEach(function (key, index) {
    //   key = key.trim();
    //   var type = dtype[key];
    //   o[key] = type ? type(values[index]) : values[index];
    // });
    // return o;
    return {
      type: 'Feature',
      properties: {
        date: moment(values[0]).format('YYYY-MM-DD'),
        confirmed: Number(values[3]) - Number(values[4]) - Number(values[5]),
        cured: Number(values[4]),
        dead: Number(values[5])
      },
      geometry: {
        type: 'Point',
        coordinates: [Number(values[2]), Number(values[1])]
      }
    }
  });
}
const getGeojson = async () => {
  // 调用实时接口
  // const { data: csv } = await axios.get('https://raw.githubusercontent.com/canghailan/Wuhan-2019-nCoV/master/Wuhan-2019-nCoV.csv')
  // 本地数据
  const { data: csv } = await axios.get('/data/time-series.csv')
  let geojsonData = {
    type: 'FeatureCollection',
    features: parseCSV(csv, { confirmed: Number, cured: Number, dead: Number })
  };
  return geojsonData;
}

export default getGeojson;