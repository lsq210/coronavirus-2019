import React, { Component } from 'react';
import './ModuleContainer.scss';

class ModuleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true
    };
  };
  changeShowTag = () => {
    this.setState({
      isShow: !this.state.isShow,
    });
  };
  render() {
    const { children, title, className } = this.props;
    const { isShow } = this.state;
    return (
      <>
        <div className={`${isShow ? '' : 'hidden'} modulebox_show ${className}`}>
          <div className="module-title">
            <span>{title}</span>
            <span className="close-button" onClick={this.changeShowTag}>关闭</span>
          </div>
          {children}
        </div>
        <div className={`${isShow ? 'hidden' : ''} modulebox_hidden ${className}`}>
          <span onClick={this.changeShowTag}>{title}</span>
        </div>
      </>
    )
  }
}
export default ModuleContainer