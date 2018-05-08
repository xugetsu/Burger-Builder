import React, {Component} from 'react';
import A from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    cheese: 0.4,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        //purchaseLoading: false,
        error: false
    }
    componentWillMount(){
        axios.get('https://react-my-burger-xugetsu.firebaseio.com/ingredients.json')
             .then( response => {this.setState({
                                               ingredients: response.data
                                            });}
            )
            .catch( error => {
                this.setState({error: true});
            })
    }
    updatePurchaseState = (ingredients) => {
        return Object.values(ingredients)
                     .reduce ( (sum, el) => sum + el, 0) > 0;
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; 
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];  
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
            purchasable: this.updatePurchaseState(updatedIngredients)
        })
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (!oldCount){return;}
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; 
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]; 
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
            purchasable: this.updatePurchaseState(updatedIngredients)
        })
    }
    purchaseHandler = () =>{
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () =>{
        const queryParams = []; // prepare a list of prop value pairs in the form 'prop=value' 
        for(let prop in this.state.ingredients){
            queryParams.push(encodeURIComponent(prop)+'='+encodeURIComponent(this.state.ingredients[prop])); 
        }
        queryParams.push('totalPrice='+encodeURIComponent(this.state.totalPrice));
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/burger-builder/Checkout',
            search: "?" + queryString // A queryString string needs to be added here as the search value
                                // it always begin with ? mark and then pairs of prop and value 
                                // in 'prop=value' form seperated by & symbol.
        });        
    }     

    render () {
        //console.log(this.props);
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let order = null;

        if(this.state.purchasing){
            order = (<OrderSummary 
                    ingredients = {this.state.ingredients}
                    purchaseCancelled ={this.purchaseCancelHandler}
                    purchaseContinued ={this.purchaseContinueHandler}
                    totalPrice = {this.state.totalPrice}/>);
        }
        // if(this.state.purchaseLoading){
        //     order = <Spinner />;
        // }

        let burger = null;
            if(this.state.ingredients){
            burger = (
                <A>
                    <Burger ingredients = {this.state.ingredients} />
                    <BuildControls 
                            price = {this.state.totalPrice}
                            purchasable = {this.state.purchasable}
                            disabled = {disableInfo}
                            addIngredient = {(type) => this.addIngredientHandler(type)}
                            removeIngredient = {(type) => this.removeIngredientHandler(type)}
                            purchase = {this.purchaseHandler}/>
                </A>
            );

        }else{
            burger = this.state.error ?<h2 style={{margin:'20px'}}>Ingredients can't be loaded :(</h2> : <Spinner />;
        }  

        return (
            <A>
                <Modal showModal = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler} >
                    {order}
                </Modal>
                {burger}
            </A>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);