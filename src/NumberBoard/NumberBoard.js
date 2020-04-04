import React, { Component } from 'react';
import './NumberBoard.scss'

class NumberBoard extends Component {
  render() {
    return (
      <div className="number-board">
        <span>新型冠状病毒疫情地图</span>
        <div className="board-container">
          <div className="confirm">
            <p className="title-confirm">确诊</p>
            <p className="number-confirm">12586</p>
            <p className="globe-confirm">Globle: 33888</p>
          </div>
          <div className="cure">
            <p className="title-cure">治愈</p>
            <p className="number-cure">4691</p>
            <p className="globe-cure">Globle: 8562</p>
          </div>
          <div className="death">
            <p className="title-death">死亡</p>
            <p className="number-death">200</p>
            <p className="globe-death">Globle: 587</p>
          </div>
        </div>
      </div>
    )
  }
}
export default NumberBoard;