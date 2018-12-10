'use strict';

class FahHeader extends React.Component {
  constructor(props) {
    super(props);
    this.goToHomePage = this.goToHomePage.bind(this);
  }

  goToHomePage() {
    window.location.href = '/';
  }

  render() {
    return (
      <div className="header-wrapper box-shadow" onClick={this.goToHomePage}>
        <div className="title">
          <span>Farm@Home.com</span>
        </div>
      </div>
    );
  }
};

