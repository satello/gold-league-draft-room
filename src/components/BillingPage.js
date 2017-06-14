import React, { Component } from 'react';

import { connect } from 'react-redux';

import Checkout from './ui/Checkout';
import PlanDetails from './ui/PlanDetails';
import YourSubscription from './ui/YourSubscription';

import '../styles/BillingPage.css';

import * as billingActions from '../reducers/billing/actions';

class BillingPage extends Component {
    componentWillMount() {
        this.props.loadSubscription();
    }
    render() {
        const hasLoaded = this.props.billing.hasLoaded;
        if (hasLoaded) {
            const subscription = this.props.billing.subscription;
            const organization = this.props.billing.organization;
            const planCost = this.props.billing.planCost;
            const showUpdateCreditCardForm = this.props.billing.showUpdateCreditCardForm;

            return (
                <div className="inner-page container-fluid BillingPage">
                    <div className="row">
                        <div className="col-sm-12 col-md-10 no-padding">
                            <div className="module" style={{minHeight: window.innerHeight - 67}}>
                                {subscription ?
                                    <div className="container-fluid">
                                        <h3 className="title text-center">Your Subscription</h3>
                                        <div className="row plan-options">
                                            <div className="col-sm-6 col-sm-push-6">
                                                <PlanDetails planCost={planCost} />
                                            </div>
                                            <div className="col-sm-6 col-sm-pull-6">
                                                {
                                                    showUpdateCreditCardForm ?
                                                        <Checkout
                                                            loggedInUser={this.props.loggedInUser}
                                                            onSubmit={this.props.updateCreditCard}
                                                            submitButtonText="Update Card"
                                                        />
                                                        :
                                                        <YourSubscription
                                                            organization={organization}
                                                            subscription={subscription}
                                                            showUpdateCreditCardForm={this.props.showUpdateCreditCardForm}
                                                        />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="container-fluid">
                                        <h3 className="text-center">Sign up for a plan</h3>
                                        <div className="row plan-options">
                                            <div className="col-sm-6 col-sm-push-6">
                                                <PlanDetails planCost={planCost} />
                                            </div>
                                            <div className="col-sm-6 col-sm-pull-6">
                                                <Checkout
                                                    loggedInUser={this.props.loggedInUser}
                                                    onSubmit={this.props.subscribe}
                                                    submitButtonText="Submit Payment"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return null;
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadSubscription: () => {
            dispatch(billingActions.loadSubscription());
        },
        subscribe: (cc_token) => {
            dispatch(billingActions.subscribe(cc_token));
        },
        updateCreditCard: (cc_token) => {
            dispatch(billingActions.updateCreditCard(cc_token));
        },
        showUpdateCreditCardForm: () => {
            dispatch(billingActions.showUpdateCreditCardForm(true));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.appState.loggedInUser,
        billing: state.billing
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillingPage);
