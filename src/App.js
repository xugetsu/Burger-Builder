import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch} from 'react-router-dom';
import Checkout from '../src/containers/Checkout/Checkout';
import Orders from '../src/containers/Orders/Orders';
class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/' exact component = {BurgerBuilder}/>
          <Route path='/Checkout' component = {Checkout}/>
          <Route path='/orders' component = {Orders}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
