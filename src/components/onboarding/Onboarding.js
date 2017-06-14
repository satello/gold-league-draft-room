import React, {Component} from 'react';
import { connect } from 'react-redux';

import '../../styles/Onboarding.css';

import logo from '../../images/logo-white.png';

import * as settingsActions from '../../reducers/settings/actions';

class Onboarding extends Component {

    componentWillMount() {
        let paypalEmail = null;
        if (this.props.location.state) {
            paypalEmail = this.props.location.state.paypalEmail;
        }
        this.props.dispatch(settingsActions.loadSettings(paypalEmail));
    }
    render() {
        const step = parseInt(this.props.routes[this.props.routes.length - 1].path, 10);
        return (
            <div className="Onboarding">
                <img src={logo} alt="Consultation Kit"/>
                <div className="onboarding-box">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <p>You're almost done! There's just a few more things we need you to do.</p>
                            <ul className="onboarding-steps">
                                <li className={step === 1 ? 'active' : step > 1 ? 'completed' : ''}>
                                    <span />Consultations</li>
                                <li className={step === 2 ? 'active' : step > 2 ? 'completed' : ''}>
                                    <span />Your Information</li>
                                <li className={step === 3 ? 'active' : step > 3 ? 'completed' : ''}>
                                    <span />Finished!</li>
                            </ul>
                            <div className="onboarding-content">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Onboarding);