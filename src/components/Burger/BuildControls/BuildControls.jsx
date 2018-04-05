import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad', type: 'salad'},
    {label:'Bacon', type: 'bacon'},
    {label:'Cheese', type: 'cheese'},
    {label:'Meat', type: 'meat'},
];

const buildControls = (props) => {
    return (
        <div className = {classes.BuildControls} >
            <p>Current Price: <b>{props.price.toFixed(2)} $</b></p>
            {controls.map(ctrl => (
                <BuildControl 
                    key = {ctrl.label} 
                    label={ctrl.label}
                    addIngredient = {() => props.addIngredient(ctrl.type)}
                    removeIngredient = {() => props.removeIngredient(ctrl.type)}
                    disabled = {props.disabled[ctrl.type]} />
            ))}
        </div>
    );
}

export default buildControls;