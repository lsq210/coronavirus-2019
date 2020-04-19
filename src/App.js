import React, { Component } from 'react';
import Map from './Map/Map';
import NumberBoard from './NumberBoard/NumberBoard';
import ModuleContainer from './ModuleContainer/ModuleContainer';
import Layers from './Modules/Layers/Layers';
import Charts from './Modules/Charts/Charts';
import Data from './Modules/Data/Data';
import TimePlayer from './Modules/Time/Time';
import Location from './Modules/Location/Location'
import geoJson from './data/overall.json'
import './App.css';
import moment from 'moment';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layers: [''],
      allData: null,
      date: new moment().format('YYYY-MM-DD'),
      countryData: null
    }
  };
  changeLayer = (checkedValues) => {
    this.setState({ layers: checkedValues });
  }
  changeTime = (index, value) => {
    this.setState({ date: moment(value, 'YYYY/MM/DD').format('YYYY-MM-DD') });
    console.log(this.state.date);
  }
  render() {
    return (
      <div>
        <Map layers={this.state.layers} date={this.state.date}></Map>
        <NumberBoard date={this.state.date}></NumberBoard>
        <ModuleContainer className="layers" title="图层选择">
          <Layers changeLayer={this.changeLayer}></Layers>
        </ModuleContainer>
        <ModuleContainer className="charts" title="历史曲线">
          <Charts></Charts>
        </ModuleContainer>
        <ModuleContainer className="data" title="统计数据">
          <Data date={this.state.date}></Data>
        </ModuleContainer>
        <ModuleContainer className="time" title="时间穿梭">
          <TimePlayer onChange={this.changeTime}></TimePlayer>
        </ModuleContainer>
        <ModuleContainer className="location" title="地区查询">
          <Location></Location>
        </ModuleContainer>
      </div>
    )
  }
}


export default App;
