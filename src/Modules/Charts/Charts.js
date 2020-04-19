import React, { Component } from 'react';
import ReactEcharts from "echarts-for-react";
import getData from '../../data/getData';
import getOption from './option';
import './Charts.scss';

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: null
    }
  };
  async componentDidMount() {
    const allData = (await getData()).filter(e => e.country === '中国' && !e.province);
    this.setState({ option: getOption(allData) });
  }
  render() {
    const { option } = this.state;
    if (!option) return null;
    return (
      <div className="charts">
        <ReactEcharts
          ref='echartsInstance'
          option={option}
          style={{ height: '150px', width: '380px' }} />
      </div>
    )
  };
};

export default Charts