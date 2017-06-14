import React, { Component } from 'react';

import TextInput from './TextInput';

import '../../styles/ui/Checkout.css';

class Checkout extends Component {
    constructor() {
        super();
        this.submitPaymentForm = this.submitPaymentForm.bind(this);
    }
    componentDidMount() {

        this.stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        const elements = this.stripe.elements();

        // Custom styling can be passed to options when creating an Element.
        var style = {
            base: {
                color: '#666',
                lineHeight: '24px',
                fontFamily: 'Roboto',
                fontSmoothing: 'antialiased',
                fontSize: '14px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };

        // Create an instance of the card Element
        this.card = elements.create('card', {hidePostalCode: true, style: style});

        // Add an instance of the card Element into the `card-element` <div>
        this.card.mount('#card-element');

        this.card.addEventListener('change', ({error}) => {
            const displayError = document.getElementById('card-errors');
            if (error) {
                displayError.textContent = error.message;
            } else {
                displayError.textContent = '';
            }
        });

    }

    submitPaymentForm(event) {
        event.preventDefault();
        const name_on_card = document.getElementById('name_on_card').value;

        const self = this;
        this.stripe.createToken(this.card, {name: name_on_card})
            .then(function(result) {
                if (result.error) {
                    // Inform the user if there was an error
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    // Send the token to your server
                    self.props.onSubmit(result.token.id);
                }
            });
    }

    render() {
        const user_full_name = this.props.loggedInUser.first_name + ' ' + this.props.loggedInUser.last_name;
        return (
            <form onSubmit={this.submitPaymentForm} id="payment-form" method="post" className="billing-form">
                <TextInput
                    name="name_on_card"
                    label="Name on card"
                    defaultValue={user_full_name}
                />
                <div className="form-row">
                    <label className="label" htmlFor="card-element">
                        Credit or debit card
                    </label>
                    <div id="card-element" className="cc-input"></div>
                    <div id="card-errors"></div>
                </div>
                <div>
                    <button type="submit" className="btn btn-blue center">{this.props.submitButtonText}</button>
                </div>
            </form>
        );
    }
}

export default Checkout;
