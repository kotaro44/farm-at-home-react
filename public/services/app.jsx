'use strict';

(function app(){
  window.addEventListener('load', onload, false);

  function onload() {
    ReactDOM.render((
      <div>
        <div className="fixed-background"></div>
        <div className="view-wrapper">
          <FahHeader />
          <div className="content-wrapper">
            <div id="view"></div>
          </div>
          <div className="footer-wrapper fah-footer-wrapper">
            <div>
              <b>Farm@Home.com</b> developed by:
            </div>
            <div>
              <a href="https://kotaro44.github.com">Carlos A. Sanchez</a>
            </div>
            <div>-2018-</div>
            <div className="framework-wrapper">
              <img src="images/f.png" />
            </div>
          </div>
        </div>
      </div>
    ), document.getElementById('root'));
  };
})();
