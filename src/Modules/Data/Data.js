import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Data.scss'
import { Table, Radio } from 'antd';

const columns = [
  {
    title: '地名',
    dataIndex: 'name',
    width: 10,
    // className: 'position'
  },
  {
    title: '确诊',
    dataIndex: 'confirm',
    width: 10,
  },
  {
    title: '治愈',
    dataIndex: 'cure',
    width: 10,
  },
  {
    title: '死亡',
    dataIndex: 'death',
    width: 10,
  },
  {
    title: '现有病例',
    dataIndex: 'current',
    width: 10,
  },
];

const data = [];
for (let i = 0; i < 32; i++) {
  data.push({
    key: i,
    name: `湖北 ${i}`,
    current: 32,
    confirm: 2222,
    cure: 1111,
    death: 100
  });
}
class Data extends Component {
  state = {
    value: 1
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <div className="data-container">
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
          scroll={{ y: 200 }}
          rowClassName={() => 'trow'} />
      </div>
    )
  }
}
export default Data;