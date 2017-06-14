import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextInput from './ui/TextInput';
import ConsultationMethod from './ui/ConsultationMethod';
import RadioInput from './ui/RadioInput';
import PaypalConnect from './ui/PaypalConnect';

import '../styles/SettingsPage.css';

import hangouts_logo from '../images/hangouts_logo.png';
import skype_logo from '../images/skype_logo.png';
import phone_logo from '../images/phone_icon.png';

import * as settingsActions from '../reducers/settings/actions';

class SettingsPage extends Component {
    componentWillMount() {
        let paypalEmail = null;
        if (this.props.location.state) {
            paypalEmail = this.props.location.state.paypalEmail;
        }
        this.props.loadSettings(paypalEmail);
    }

    render() {
        const formData = this.props.settings.formData || {};
        const hasBeenUpdated = this.props.settings.hasBeenUpdated;
        const updateFormData = this.props.updateFormData;
        const saveSettings = this.props.saveSettings;

        if (this.props.settings.hasLoaded) {
            return (
                <div className="inner-page container-fluid SettingsPage">
                    <div className="row">
                        <div className="col-sm-12 col-md-10 no-padding">
                            <div className="module">
                                <h3 className="title text-center">Consultation Settings</h3>
                                <div className="input-group">
                                    <p>Which of your calendars would you like us to add your bookings to?</p>
                                    <div className="selectable-calendars">
                                        {formData.google_calendars.map(cal =>
                                            <RadioInput
                                                key={cal.id}
                                                checked={cal.id === formData.selected_calendar}
                                                label={cal.summary + '' + (cal.primary ? ' (your primary calendar)' : '')}
                                                name="selected_calendar"
                                                value={cal.id}
                                                onChange={updateFormData}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="input-group">
                                            <span className="label">
                                                How would you like to hold your consultations?
                                            </span>
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <ConsultationMethod
                                                        checked={formData.consultation_method === 'hangout'}
                                                        label="Google Hangout"
                                                        image={hangouts_logo}
                                                        name="consultation_method"
                                                        value="hangout"
                                                        onChange={updateFormData}
                                                        />
                                                </div>
                                                <div className="col-sm-4">
                                                    <ConsultationMethod
                                                        checked={formData.consultation_method === 'skype'}
                                                        label="Skype"
                                                        image={skype_logo}
                                                        name="consultation_method"
                                                        value="skype"
                                                        onChange={updateFormData}
                                                    />
                                                </div>
                                                <div className="col-sm-4">
                                                    <ConsultationMethod
                                                        checked={formData.consultation_method === 'phone'}
                                                        label="Phone Call"
                                                        image={phone_logo}
                                                        name="consultation_method"
                                                        value="phone"
                                                        onChange={updateFormData}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="method-extra-step">
                                                        <div className={formData.consultation_method === 'hangout' ? 'hangout-all-set' : 'hide'}>
                                                            <p>
                                                                <span className="blue-text">
                                                                    <i className="fa fa-check-circle-o" />
                                                                    You're all set!
                                                                </span>
                                                                Since your account is linked with your Google
                                                                account we'll create hangout links for you.
                                                            </p>
                                                        </div>
                                                        <TextInput
                                                            hidden={formData.consultation_method !== 'skype'}
                                                            name="skype_username"
                                                            label="Skype Username"
                                                            value={formData.skype_username || ''}
                                                            onChange={updateFormData}
                                                        />
                                                        <TextInput
                                                            hidden={formData.consultation_method !== 'phone'}
                                                            name="phone_number"
                                                            label="Phone Number"
                                                            value={formData.phone_number || ''}
                                                            onChange={updateFormData}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                </div>
                                <h3 className="title text-center">Your Information</h3>
                                <div className="input-group">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <TextInput
                                                name="first_name"
                                                label="First Name"
                                                value={formData.first_name || ''}
                                                onChange={updateFormData}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <TextInput
                                                name="last_name"
                                                label="Last Name"
                                                value={formData.last_name || ''}
                                                onChange={updateFormData}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <TextInput
                                                name="email"
                                                label="Email Address (synced with your Google account)"
                                                value={formData.email || ''}
                                                emptyMessage="You must enter a name"
                                                disabled={true}
                                                onChange={updateFormData}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="title text-center">Organization Information</h3>
                                <div className="input-group">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <TextInput
                                                name="organization_name"
                                                label="Organization Name"
                                                value={formData.organization_name || ''}
                                                onChange={updateFormData}
                                                emptyMessage="You must enter a name"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <TextInput
                                                name="organization_website"
                                                label="Website"
                                                value={formData.organization_website || ''}
                                                onChange={updateFormData}
                                                errorMessage=""
                                                emptyMessage="You must enter a url"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <div className="label">Link your Paypal account</div>
                                    <PaypalConnect
                                        paypalEmail={formData.organization_paypal_account_email || null}
                                        name="organization_paypal_account_email"
                                        returnUrl="settings"
                                        onChange={updateFormData}
                                    />
                                </div>
                                <button
                                    className={ hasBeenUpdated ? 'btn btn-blue center' : 'btn btn-disabled center'}
                                    onClick={hasBeenUpdated ? saveSettings : null}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="help-sidebar">
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
        updateFormData: (key, value) => {
            dispatch(settingsActions.updateFormData(key, value));
        },
        loadSettings: (paypalEmail) => {
            dispatch(settingsActions.loadSettings(paypalEmail));
        },
        saveSettings: (e) => {
            e.preventDefault();
            dispatch(settingsActions.saveSettings());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        settings: state.settings
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
