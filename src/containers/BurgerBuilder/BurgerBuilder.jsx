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
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
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
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, // this is not the setup that will be use it in a real app
            cutomer: {                     // the price need to be calculated in the server !!
                 name: 'Ali othmani',
                 address: {
                     street: 'TestStreet1',
                     zipCode: '16846815',
                     country: 'LolliWorld'
                 },
            },
            email: 'test@test.com',
            deliveryMethode: 'Fastest' 
        };      
        axios.post('/orders.json', order)
            .then ( response => {this.setState({loading: false, purchasing: false});})
            .catch( error    => {this.setState({loading: false, purchasing: false});});
    }     

    render () {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        let order = <OrderSummary 
                        ingredients = {this.state.ingredients}
                        purchaseCancelled ={this.purchaseCancelHandler}
                        purchaseContinued ={this.purchaseContinueHandler}
                        totalPrice = {this.state.totalPrice}/>;
        if(this.state.loading){
            order = <Spinner />;
            console.log('set to loading mode ')
        }    
        return (
            <A>
                <Modal showModal = {this.state.purchasing} 
                        modalClosed = {this.purchaseCancelHandler} >
                    {order}
                </Modal>
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
    }
}

export default withErrorHandler(BurgerBuilder, axios);