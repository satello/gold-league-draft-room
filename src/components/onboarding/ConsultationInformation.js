import React from 'react';
import { connect } from 'react-redux';

import TextInput from '../ui/TextInput';
import ConsultationMethod from '../ui/ConsultationMethod';
import RadioInput from '../ui/RadioInput';

import hangouts_logo from '../../images/hangouts_logo.png';
import skype_logo from '../../images/skype_logo.png';
import phone_logo from '../../images/phone_icon.png';

import {browserHistory} from 'react-router';

import * as settingsActions from '../../reducers/settings/actions';

const ConsultationInformation = (props) => {
    const formData = props.settings.formData || {};
    const updateFormData = props.updateFormData;
    const saveSettings = props.saveSettings;

    return (
        <div>
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
                <div className="row">
                    <div className="col-sm-12">
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
                </div>
            </div>
            <div className="progress-buttons">
                <button onClick={saveSettings} className="btn btn-blue btn-small btn-inline">Next</button>
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
                browserHistory.push('/onboarding/2');
            }));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        settings: state.settings
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConsultationInformation);