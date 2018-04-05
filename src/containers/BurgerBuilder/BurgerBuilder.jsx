import React, {Component} from 'react';
import A from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
    render () {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        return (
            <A>
                <Modal showModal = {this.state.purchasing}>
                  <OrderSummary ingredients = {this.state.ingredients}/>
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

export default BurgerBuilder;