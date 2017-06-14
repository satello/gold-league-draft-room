import React from 'react';
import { connect } from 'react-redux';

import TextInput from '../ui/TextInput';
import PaypalConnect from '../ui/PaypalConnect';

import { browserHistory } from 'react-router';

import * as settingsActions from '../../reducers/settings/actions';
import { onboardingFinished } from '../../reducers/app/actions';

const YourInformation = (props) => {
    const formData = props.settings.formData || {};
    const updateFormData = props.updateFormData;
    const saveSettings = props.saveSettings;

    return (
        <div>
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
                            disabled={true}
                            onChange={updateFormData}
                        />
                    </div>
                </div>
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
                    returnUrl="onboarding/2"
                    onChange={updateFormData}
                />
            </div>
            <div className="progress-buttons">
                <button onClick={saveSettings} className="btn btn-blue btn-small btn-inline">Done</button>
            </div>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateFormData: (key, value) => {
            dispatch(settingsActions.updateFormData(key, value));
        },
        loadSettings: () => {
            dispatch(settingsActions.loadSettings());
        },
        saveSettings: (e) => {
            e.preventDefault();
            dispatch(settingsActions.saveSettings(() => {
                dispatch(onboardingFinished());
                browserHistory.push('/');
            }));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        settings: state.settings
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(YourInformation);