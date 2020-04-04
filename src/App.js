import React, { Component } from 'react';
import './App.css';
import Map from './Map/Map';
import ModuleContainer from './ModuleContainer/ModuleContainer';
import Layers from './Modules/Layers/Layers';
import Charts from './Modules/Charts/Charts';
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
        <ModuleContainer title="图层选择">
          图层选择
          <Layers changeLayer={this.changeLayer}></Layers>
        </ModuleContainer>
        <ModuleContainer title="历史曲线" style="bottom: 30px; left: 20px">
          历史曲线
          <Charts changeLayer={this.changeLayer}></Charts>
        </ModuleContainer>
        <NumberBoard></NumberBoard>
      </div>
    )
  }
}


export default App;
