import React , {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredients.css'

class BurgerIngredients extends Component {
    render(){
        let ingredient = null;
        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div class = {classes.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingredient = (
                    <div class = {classes.BreadTop} >
                        <div class = {classes.Seeds1} ></div>
                        <div class = {classes.Seeds2} ></div>
                    </div>);   
                break;
            case ('meat'):
                ingredient = <div class = {classes.Meat}></div>
                break;
            case ('cheese'):
                ingredient = <div class = {classes.Cheese}></div>;
                break;
            case ('salad'):
                ingredient = <div class = {classes.Salad}></div>;
                break;
            case ('bacon'):
                ingredient = <div class = {classes.Bacon}></div>;
                break;                        
            default: 
                ingredient = null;
                break;
        }
        return ingredient;
    };
}

BurgerIngredients.prototypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredients;