import React from 'react';
import classes from './Button.css';

const button = (props) => {
    let btnClasses = [classes.Button, classes[props.btnType]];
    if(props.disabled){
        btnClasses.push(classes.Disabled);
    }
    return(<button 
                className = {btnClasses.join(' ')}
                onClick = {props.clicked}
                disabled = {props.disabled}>{props.children}
               
            </button>)
};

export default button;