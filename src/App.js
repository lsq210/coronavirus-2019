import React, { Component } from 'react';
import './App.css';
import Map from './Map/Map';
import ModuleContainer from './ModuleContainer/ModuleContainer';
import Layers from './Modules/Layers/Layers';
import Charts from './Modules/Charts/Charts';
import Data from './Modules/Data/Data';
import NumberBoard from './NumberBoard/NumberBoard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layers: ['']
    }
  };
  changeLayer = (checkedValues) => {
    this.setState({ layers: checkedValues })
    console.log('layers', this.state.layers)
  };
  render() {
    return (
      <div>
        <Map layers={this.state.layers}></Map>
        <NumberBoard></NumberBoard>
        <ModuleContainer className="layers" title="图层选择">
          <Layers changeLayer={this.changeLayer}></Layers>
        </ModuleContainer>
        <ModuleContainer className="charts" title="历史曲线">
          <Charts></Charts>
        </ModuleContainer>
        <ModuleContainer className="data" title="统计数据">
          <Data></Data>
        </ModuleContainer>
      </div>
    )
  }
}


export default App;
