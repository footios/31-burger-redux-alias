import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary'
import ContactData from '../ContactData'


export default (props) => {

     const [ingredients, setIngredients] = useState(null);
     const [totalPrice, setTotalPrice] = useState(0)

     // After passing the ingredients to the search query in BurgerBuilder
     // now we need to parse them in the Checkout
    // 251. We need to change the life cycle hook to ...WillMount because we
    // get an error. We need to parse the ingredients before it mounts,
    // because otherwise the component will try to render with null ingredients...
    if(!ingredients) {
        console.log('Checkout : ', props);
        
        const query = new URLSearchParams(props.location.search)
        const ingredients = {}
        let price = 0
        for (const param of query.entries()) {
            // ['salad', '1']
            // This is a workaround to get the price, i.e. temporary...
            if (param[0] === 'price') {
                price = param[1]
            } else {
                ingredients[param[0]] = +param[1]
            }
        }
        // Because we save the ingredients to state. They will not change if we change the address
        // (if the query params get lost)
        // by going to 'chekout/contact-data'
        console.log('Checkout : ', ingredients, ' ', price);
        setTotalPrice(price);
        setIngredients(ingredients)
        
        // this.setState({ingredients: ingredients, totalPrice: price})
    }

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace( '/checkout/contact-data' );
        
    }

        return ( 
            <div>
            <CheckoutSummary
                ingredients={ingredients}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler} />
            <Route 
                path={props.match.path + '/contact-data'} 
                render={(props) => 
                <ContactData 
                ingredients={ingredients} 
                price={totalPrice}
                {...props}/>} />
                
        </div>
         );
    }
 
