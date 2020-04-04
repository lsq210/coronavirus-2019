import React, { Component } from 'react';
import './NumberBoard.scss'

class NumberBoard extends Component {
  render() {
    return (
      <div className="number-board">
        <p>新型冠状病毒疫情地图</p>
        <div className="board-container">
          <div className="confirm">
            <p className="title-confirm">确诊</p>
            <p className="number-confirm">586</p>
            <p className="globe-confirm">Globle: 888</p>
          </div>
          <div className="cure">
            <p className="title-cure">治愈</p>
            <p className="number-cure">469</p>
            <p className="globe-cure">Globle: 562</p>
          </div>
          <div className="death">
            <p className="title-death">死亡</p>
            <p className="number-death">20</p>
            <p className="globe-death">Globle: 58</p>
          </div>
        </div>
      </div>
    )
  }
}
export default NumberBoard;