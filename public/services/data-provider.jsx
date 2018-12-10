'use strict';

(function DataProvider() {
	var host = 'https://s3-eu-west-1.amazonaws.com/developer-application-test/cart/';

	function _getData(url, success, error) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function onLoad() {
      if (xhr.status === 200 ) {
        success(JSON.parse(xhr.response));
      }
      else {
        error(xhr.response);
      }
    };

    xhr.open('GET', host + url);
    xhr.send();
	};

	window.DataProvider = {
    getProducts: () => {
      return new Promise((resolve, reject) => {
        _getData('list', (data) => {
          resolve(data.products);
        }, (error) => {
          reject(error);
        });
      });
    },
    getProduct: (id) => {
      return new Promise((resolve, reject) => {
        _getData(id + '/detail', (data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
      });
    },
	};
})();
