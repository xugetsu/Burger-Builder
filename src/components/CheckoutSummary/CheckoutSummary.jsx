import React from 'react';
import classes from './CheckoutSummary.css';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';


const checkoutSummary = ( props ) => {
    console.log(props);

    return(
        <div className={classes.CheckoutSummary} >
            <h1>We hope it taste good</h1> 
            <div className={classes.Burger}>
                <Burger ingredients={props.ingredients? props.ingredients : {}} />
            </div>
            <Button btnType='Success' clicked={props.checkoutContined} >Continue</Button>
            <Button btnType='Danger' clicked={props.checkoutCanceled} >Cancel</Button>
        </div>
    );
}
 
export default checkoutSummary;