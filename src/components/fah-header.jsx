import React, { Component } from 'react'
import reactLogo from '../images/f.png'
import reactLogoSmall from '../images/i.png'

class FahHeader extends Component {
  goToHomePage() {
    window.location.href = '#/list'; 
  }

  render() {
    return (
      <div className="header-wrapper box-shadow" onClick={this.goToHomePage.bind(this)}>
        <div className="section">
          <span className="title">Farm@Home.com</span>
        </div>
        <div className="section">
          <div className="framework-wrapper">
            <img src={reactLogo} className="big" />
            <img src={reactLogoSmall} className="small" />
          </div>
        </div>
      </div>
    );
  }
}

export default FahHeader;
