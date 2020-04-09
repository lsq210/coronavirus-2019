import React, { Component } from 'react';
import './Time.scss';
import Player from 'timeplayer';
// const dom = document.getElementById("demo");
// 创建数据 
// 数据dates的格式为 ["2020/2/9", "2020/2/10", "2020/2/11"...]
const dates = [];
const now = new Date();
now.setDate(-20);
for (var i = 0; i < 20; i++) {
  const str = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
  dates.push(str);
  now.setDate(now.getDate() + 1);
}

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerRef: React.createRef(),
      player: null
    }
  }
  componentDidMount() {
    const { playerRef } = this.state;
    this.setState({
      player: new Player(playerRef.current, {
        dates,
        theme: 'dark'
      })
    })
  }
  render() {
    const { playerRef } = this.state;
    return (
      <div className="time-container">
        <div ref={playerRef}></div>
      </div>
    )
  }
}
export default Time;