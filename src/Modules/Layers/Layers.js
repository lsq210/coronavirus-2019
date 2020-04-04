import React, { Component } from 'react';
import { Checkbox } from 'antd';

const options = [
  { label: '热力图', value: 'heatmap' },
  { label: '填色图', value: 'colorfill' },
  { label: '分类集合', value: 'category' },
  { label: '集合', value: 'cluster' },
];

class Layers extends Component {
  constructor(props) {
    super(props);
  };
  changeLayer = (checkedValues) => {
    console.log('checked = ', checkedValues);
    this.props.changeLayer(checkedValues);
  }
  render() {
    return (
      <div>
        <Checkbox.Group options={options} defaultValue={['heatmap']} onChange={this.changeLayer} />
      </div>
    )
  };
}
export default Layers