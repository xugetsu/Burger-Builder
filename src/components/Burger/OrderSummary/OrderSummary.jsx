import React from 'react';
import A from '../../../hoc/Auxx';
import Button from '../../UI/Button/Button';
//import {NavLink} from 'react-router-dom';
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
                <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                {/* <NavLink to={{
                                pathname: '/Checkout',
                                state : props.ingredients
                            }}>
                  <Button btnType ="Success" clicked ={() => null}>CONTINUE</Button>
                </NavLink> */}
                <Button btnType ="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
                <Button btnType ="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            </A>
            );
};

export default orderSummary; 