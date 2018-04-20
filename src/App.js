import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch} from 'react-router-dom';
import Checkout from '../src/containers/Checkout/Checkout';
class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/' exact component = {BurgerBuilder}/>
          <Route path='/Checkout' exact component = {Checkout}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
