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
          <Route path='/burger-builder' exact component = {BurgerBuilder}/>
        <Switch>
          <Route path='/burger-builder/Checkout' component = {Checkout}/>
          <Route path='/burger-builder/orders' component = {Orders}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
