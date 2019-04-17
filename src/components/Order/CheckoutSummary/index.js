import React from 'react';

import Burger from '../../Burger';
import Button from '../../UI/Button';
import classes from './index.module.css';

export default ({ ingredients, checkoutCancelled, checkoutContinued  }) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={ingredients}/>
            </div>
            <Button 
                btnType="Danger"
                clicked={checkoutCancelled}>CANCEL</Button>
            <Button 
                btnType="Success"
                clicked={checkoutContinued}>CONTINUE</Button>
        </div>
    );
}

