import React, { Component } from 'react';
import Map from './Map/Map';
import NumberBoard from './NumberBoard/NumberBoard';
import ModuleContainer from './ModuleContainer/ModuleContainer';
import Layers from './Modules/Layers/Layers';
import Charts from './Modules/Charts/Charts';
import Data from './Modules/Data/Data';
import TimePlayer from './Modules/Time/Time';
import './App.css';
import moment from 'moment';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layers: [''],
      property: null,
      allData: null,
      // date: new moment().format('YYYY-MM-DD'),//实时更新
      date: '2020-04-18', //本地数据
      countryData: null
    }
  };
  changeLayer = (checkedValues) => {
    this.setState({ layers: checkedValues });
  }
  changeProperty = (radioValue) => {
    this.setState({ property: radioValue });
  }
  changeTime = (index, value) => {
    this.setState({ date: moment(value, 'YYYY/MM/DD').format('YYYY-MM-DD') });
    // console.log(this.state.date);
  }
  render() {
    return (
      <div>
        <Map layers={this.state.layers} property={this.state.property} date={this.state.date}></Map>
        <NumberBoard date={this.state.date}></NumberBoard>
        <ModuleContainer className="layers" title="图层选择">
          <Layers changeLayer={this.changeLayer} changeProperty={this.changeProperty}></Layers>
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
      </div>
    )
  }
}


export default App;
