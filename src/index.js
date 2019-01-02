import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import ReactDOM from 'react-dom'
import FahHeader from './components/fah-header.jsx'
import FahFooter from './components/fah-footer.jsx'
import ProductList from './components/product-list.jsx'
import ProductDetail from './components/product-detail.jsx'

ReactDOM.render((
  <HashRouter>
    <div>
      <div className="fixed-background"></div>
      <div className="view-wrapper">
        <FahHeader />
        <div className="content-wrapper">
          <Switch>
            <Route exact path='/' render={() => {return <Redirect to="/list"/>}}/>
            <Route exact path='/list' component={ProductList}></Route>
            <Route exact path='/list/:id' component={ProductDetail}></Route>
          </Switch>
        </div>
        <FahFooter />
      </div>
    </div>
  </HashRouter>
), document.getElementById('root'));
