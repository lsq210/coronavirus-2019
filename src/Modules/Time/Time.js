import React, { Component } from 'react';
import './Time.scss';
import Player from 'timeplayer';
import moment from 'moment';
// 创建数据 
// 数据dates的格式为 ["2020/2/9", "2020/2/10", "2020/2/11"...]
const dates = [];
const startDate = moment('2019-12-01');
const endDate = new moment();
const duration = parseInt(moment.duration(endDate.diff(startDate)).asDays());
for (var i = 0; i < duration; i++) {
  const str = startDate.format('YYYY-MM-DD');
  dates.push(str);
  startDate.add(1, 'days');
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
    const { onChange } = this.props
    const { playerRef } = this.state;
    const player = new Player(playerRef.current, { dates, theme: 'dark' });
    player.on('change', onChange);
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