import React, { Component } from 'react';
import { Table, Radio } from 'antd';
import getData from '../../data/getData'
import 'antd/dist/antd.css';
import './Data.scss'


const columns = [
  {
    title: '地区',
    dataIndex: 'name',
    width: 10
  },
  {
    title: '确诊',
    dataIndex: 'confirm',
    width: 10
  },
  {
    title: '治愈',
    dataIndex: 'cure',
    width: 10
  },
  {
    title: '死亡',
    dataIndex: 'death',
    width: 10
  },
  {
    title: '现有病例',
    dataIndex: 'current',
    width: 10
  },
];

class Data extends Component {
  state = {
    value: 1,
    ChinaData: null,
    GlobleData: null
  };
  async componentDidMount() {
    this.setState({ ChinaData: (await getData()).cityData.filter(e => e.date === this.props.date) });
    this.setState({ GlobleData: (await getData()).countryData.filter(e => e.date === this.props.date) });
  }
  async componentDidUpdate(prevPros) {
    if (this.props.date !== prevPros.date) {
      this.setState({ ChinaData: (await getData()).cityData.filter(e => e.date === this.props.date) });
      this.setState({ GlobleData: (await getData()).countryData.filter(e => e.date === this.props.date) });
    }
  }
  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { ChinaData, GlobleData, value } = this.state
    const data = [];
    if (value === 1 && ChinaData) {
      for (let i = 0; i < ChinaData.length; i++) {
        data.push({
          key: i,
          name: ChinaData[i].province,
          current: ChinaData[i].confirmed - ChinaData[i].cured - ChinaData[i].dead,
          confirm: ChinaData[i].confirmed,
          cure: ChinaData[i].cured,
          death: ChinaData[i].dead
        });
      }
    } else if (value === 2 && GlobleData) {
      for (let i = 0; i < GlobleData.length; i++) {
        data.push({
          key: i,
          name: GlobleData[i].country,
          current: GlobleData[i].confirmed - GlobleData[i].cured - GlobleData[i].dead,
          confirm: GlobleData[i].confirmed,
          cure: GlobleData[i].cured,
          death: GlobleData[i].dead
        });
      }
    }
    return (
      { data } && <div className="data-container">
        <div className="data-change">
          <span>数据：</span>
          <Radio.Group onChange={this.onChange} value={this.state.value}>
            <Radio value={1}>中国</Radio>
            <Radio value={2}>世界</Radio>
          </Radio.Group>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          size={"small"}
          scroll={{ y: 160 }}
          rowClassName={() => 'trow'} />
      </div>
    )
  }
}
export default Data;