import React, { Component } from 'react';
import './ModuleContainer.css';

class ModuleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: props.close ? false : true,
    };
  };
  changeShowTag = () => {
    this.setState({
      isShow: !this.state.isShow,
    });
  };
  render() {
    const { autowidth, children, title, right, hidden } = this.props;
    const { isShow } = this.state;
    return <div className={`margin-top ${hidden ? 'hidden' : ''}`}>
      <div className={`module ${autowidth ? '' : 'fix-width'} ${isShow ? '' : 'unshow'}`}>
        <div className="close-button" onClick={this.changeShowTag}>关闭</div>
        {children}
      </div>
      <div className={`title module ${isShow ? 'unshow' : ''} ${right ? 'right' : ''}`} onClick={this.changeShowTag}>{title}</div>
    </div>
  }
}
export default ModuleContainer