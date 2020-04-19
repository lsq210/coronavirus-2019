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
const getCSV = async () => {
  const { data: csv } = await axios.get('https://raw.githubusercontent.com/canghailan/Wuhan-2019-nCoV/master/Wuhan-2019-nCoV.csv')
  let data_list = parseCSV(csv, { confirmed: Number, suspected: Number, cured: Number, dead: Number });
  return data_list;
}

export default getCSV;