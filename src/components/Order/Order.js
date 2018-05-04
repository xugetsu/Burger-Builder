import React from 'react';
import classes from './Order.css'

const order = (props) => {
        const ingredients = Object.keys(props.ingredients).map( 
                ingKey =>   (<span key = {ingKey}>
                                {ingKey +' '+ props.ingredients[ingKey] }
                            </span>)
        );
        return(
             <div className={classes.Order}>
                 <p>Ingredients:{ingredients}</p>
                 <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
             </div>
        );
}

export default order;