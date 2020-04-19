import React, { Component } from 'react';
import { Input } from 'antd';
import './Location.scss'

const { Search } = Input;

class Location extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="location-container">
        <span>请输入想查询的地区</span>
        {/* <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: 180 }}
        /> */}
      </div>
    )
  }
}
export default Location