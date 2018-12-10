'use strict';

/**
 * ReactJS already have a more powerful route controller, however using this more simple route controller
 * we can have much more control about the behaviour of the app.
 *
 * all routes are specified at window.states object
 */
(function route() {
  window.addEventListener('hashchange', onHashChange, false);
  window.addEventListener('load', onload, false);

  function onload() {
    window.states = {
      default: '/list',
      list: {
        name: '/list',
        component: ProductList,
      },
      'list/:param': {
        name: '/list/:param',
        component: ProductDetail,
      },
    };

    evaluateHash();
  };

  function onHashChange() {
    evaluateHash();
  };

  function redirectToDefault() {
    window.location.href = '#' + window.states.default;
  };

  function getState(state) {
    var params = state.match(/[^\/]+\/?(.*)/)[1];

    return {
      path: state.match(/[^\/]+/)[0] + (params ? '/:param' : ''),
      params: params,
    };
  };

  function loadState(state, param) {
    var element = document.getElementById('view');
    var reactElement = React.createElement(state.component, {param: param});
    ReactDOM.unmountComponentAtNode(element);
    element.innerHTML = '';
    ReactDOM.render(reactElement, element);
  };

  function evaluateHash() {
    var state = null;
    var newState = null;

    if (!window.location.hash) {
      redirectToDefault();
    }
    else {
      state = window.location.hash.split('#')[1].split('?')[0];
      newState = getState(state);

      if (!window.states[newState.path]) {
        redirectToDefault();
      }
      else {
        loadState(window.states[newState.path], newState.params);
      }
    }
  };
})();
