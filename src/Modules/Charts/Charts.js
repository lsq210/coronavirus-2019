import React, { Component } from 'react';
import ReactEcharts from "echarts-for-react";
import { Radio } from 'antd';
import getData from '../../data/getData';
import getOption from './option';
import './Charts.scss';

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: null,
      value: 1
    }
  };
  componentDidMount() {
    this.getChartData();
  }
  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    }, () => this.getChartData());
  };
  async getChartData() {
    let data = [];
    if (this.state.value === 1) {
      data = (await getData()).countryData.filter(e => e.country === '中国');
    } else {
      const globleData = (await getData()).countryData;
      var map = new Map();
      globleData.forEach((item) => {
        const { confirmed = 0, cured = 0, dead = 0, date } = item;
        if (!date) return;
        if (!map.has(date)) {
          map
            .set(date, {
              confirmed: confirmed,
              cured: cured,
              dead: dead
            })
        } else {
          const newConfirmed = map.get(date).confirmed + confirmed;
          const newCured = map.get(date).cured + cured;
          const newDead = map.get(date).dead + dead;
          map
            .set(date, {
              confirmed: newConfirmed,
              cured: newCured,
              dead: newDead
            })
        }
      }
      )
      for (let value of map.values()) {
        data.push(value);
      }
    }
    this.setState({ option: getOption(data) });
  }
  render() {
    const { option } = this.state;
    if (!option) return null;
    return (
      <div className="charts">
        <Radio.Group onChange={this.onChange} value={this.state.value}>
          <Radio value={1}>中国</Radio>
          <Radio value={2}>世界</Radio>
        </Radio.Group>
        <ReactEcharts
          ref='echartsInstance'
          option={option}
          style={{ height: '140px', width: '380px' }} />
      </div>
    )
  };
};

export default Charts