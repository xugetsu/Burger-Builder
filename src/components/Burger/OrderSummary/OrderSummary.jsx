import React from 'react';
import A from '../../../hoc/Auxx';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map( ingkey => 
                <li key = {ingkey} >
                    <span style={{textTransform:'capitalize'}}>
                        {ingkey}
                    </span>
                     : {props.ingredients[ingkey]}
                </li>
        );
    return (
            <A>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to checkout?</p>
            </A>
            );
};

export default orderSummary; 