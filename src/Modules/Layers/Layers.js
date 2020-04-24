import React, { Component } from 'react';
import { Checkbox, Row, Col, Radio } from 'antd';
import './Layers.scss';

class Layers extends Component {
  state = {
    disabled: {
      heatmap: false,
      cluster: true
    }
  }
  changeLayer = (checkedValues) => {
    this.setState({
      disabled: {
        heatmap: checkedValues.findIndex(item => item === 'heatmap') === -1,
        cluster: checkedValues.findIndex(item => item === 'cluster') === -1
      }
    })
    this.props.changeLayer(checkedValues);
  }
  changeHeatProperty = (e) => {
    this.props.changeProperty(`heatmap,${e.target.value}`);
  }
  changeClusterProperty = (e) => {
    this.props.changeProperty(`cluster,${e.target.value}`);
  }
  render() {
    const { disabled } = this.state;
    return (
      <div className="layer-container">
        <Checkbox.Group defaultValue={['heatmap', 'category']} onChange={this.changeLayer}>
          <Row>
            <Checkbox value="heatmap">热力图</Checkbox>
            <Radio.Group
              className="radios"
              defaultValue="exist"
              disabled={disabled.heatmap}
              onChange={this.changeHeatProperty}>
              <Radio value="exist">现有</Radio>
              <Radio value="confirmed">确诊</Radio>
              <Radio value="cured">治愈</Radio>
              <Radio value="dead">死亡</Radio>
            </Radio.Group>
          </Row>
          <Row>
            <Checkbox value="cluster">聚合图</Checkbox>
            <Radio.Group
              className="radios"
              defaultValue="exist"
              disabled={disabled.cluster}
              onChange={this.changeClusterProperty}>
              <Radio value="exist">现有</Radio>
              <Radio value="confirmed">确诊</Radio>
              <Radio value="cured">治愈</Radio>
              <Radio value="dead">死亡</Radio>
            </Radio.Group>
          </Row>
          <Row>
            <Checkbox value="category">分类图</Checkbox>
            <span className="tag" style={{ background: "rgb(239, 91, 86)" }}>现有确诊</span>
            <span className="tag" style={{ background: "rgb(97, 255, 161)" }}>累计治愈</span>
            <span className="tag" style={{ background: "rgb(199, 213, 220)" }}>累计死亡</span>
          </Row>
        </Checkbox.Group>
      </div>
    )
  };
}
export default Layers