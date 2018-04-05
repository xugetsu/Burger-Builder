import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    const ingredients = Object.keys(props.ingredients)
                        .map( igkey => [...Array(props.ingredients[igkey])].map( 
                                    (_,i) => <BurgerIngredient key = {igkey + i} type = {igkey}/> )
                         );
    return (
        <div className = {classes.Burger}>
            <BurgerIngredient type = 'bread-top'/>
                      {ingredients}
            <BurgerIngredient type = 'bread-bottom'/>
        </div>
    );
}

export default burger;