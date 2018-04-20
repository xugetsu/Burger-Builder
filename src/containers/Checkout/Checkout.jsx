import React, {Component} from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{
    state = {
        ingredients: {},
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for( let param of query){
           ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients:ingredients});
    }
    checkoutContinedHandler = () => {
        this.props.history.replace('/Checkout/contact-data');
    }
    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }
    render(){
        console.log(this.props);
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCanceled = {this.checkoutCanceledHandler}
                    checkoutContined = {this.checkoutContinedHandler}/>
            </div>
        );
    }
}
export default Checkout; 