import React, {Component} from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';

class Checkout extends Component{
    state = {
        ingredients: {},
        totalPrice:0,
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for( let param of query){ // no need to add .entries()
            if(param[0] === 'totalPrice'){
                totalPrice = param[1]; 
            }else{
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients:ingredients, totalPrice:totalPrice});
        //console.log('[checkout]',this.props);
    }
    checkoutContinedHandler = () => {
        this.props.history.replace('/burger-builder/Checkout/contact-data');
    }
    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }
    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCanceled = {this.checkoutCanceledHandler}
                    checkoutContined = {this.checkoutContinedHandler}/>
                <Route 
                    path={this.props.match.url + '/contact-data'} 
                    render ={(props) => <ContactData  ingredients={this.state.ingredients}    
                                                      totalPrice={this.state.totalPrice}
                                                      {...props}/>}
                />
            </div>
        );
    }
}
export default Checkout; 