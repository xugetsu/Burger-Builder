import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    let ingredients = Object.keys(props.ingredients)
                        .map( igkey => [...Array(props.ingredients[igkey])].map( 
                                    (_,i) => <BurgerIngredient key = {igkey + i} type = {igkey}/> )
                         )
                        .reduce((arr,el) => arr.concat(el), []);
    if (!ingredients.length){
        ingredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className = {classes.Burger}>
            <BurgerIngredient type = 'bread-top'/>
                      {ingredients}
            <BurgerIngredient type = 'bread-bottom'/>
        </div>
    );
}

export default burger;