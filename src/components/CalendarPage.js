import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/CalendarPage.css';

import TextInput from './ui/TextInput';
import MoneyInput from './ui/MoneyInput';
import TimeInput from './ui/TimeInput';
import SubdomainInput from './ui/SubdomainInput';

import EmbedCodeModal from './modals/EmbedCodeModal';

import * as calendarActions from '../reducers/calendar/actions';

class CalendarPage extends Component {
    componentWillMount() {
        this.props.loadCalendars();
    }
    componentWillReceiveProps(nextProps) {
        // if either just saved or just loaded
        if ((this.props.calendar.hasBeenUpdated && !nextProps.calendar.hasBeenUpdated) || (!this.props.calendar.hasLoaded && nextProps.calendar.hasLoaded)) {

            let time_slot_minutes = null;
            const meeting_length = Math.floor(nextProps.calendar.formData.meeting_length/2);
            if(nextProps.calendar.formData.meeting_length >= 60)
                time_slot_minutes = Math.ceil(meeting_length/5.0) * 5;
            else if(nextProps.calendar.formData.meeting_length > 0)
                time_slot_minutes = Math.ceil(meeting_length/5.0) * 5;
            else
                time_slot_minutes = 15;

            console.log(nextProps.calendar);
            const widget = new window.ConsultationKit();
            widget.init({
                targetEl: "#ck-widget",
                paypalEnv: "sandbox",
                localConfig: true,
                userId: nextProps.loggedInUser.id,
                editCalendar: false,
                baseUrl: process.env.REACT_APP_API_ENDPOINT,
                apiToken: nextProps.jwt,
                calendarId: nextProps.calendar.formData.id,
                pricePerMeeting: nextProps.calendar.formData.price_per_meeting,
                name: nextProps.loggedInUser.first_name + ' ' + nextProps.loggedInUser.last_name,
                calendar_name: nextProps.calendar.formData.name,
                goToFirstEvent: true,
                fullCalendar: {
                    views: {
                        agenda: {
                            slotDuration: '00:'+ time_slot_minutes +':00',
                            slotLabelFormat: 'h:mm'
                        }
                    }
                },
                timezone: nextProps.calendar.formData.timezone,
                bookingFields: {
                    [nextProps.calendar.formData.user.consultation_method]: {
                        enabled: true
                    }
                }
            });
        }
    }
    render() {
        const formData = this.props.calendar.formData;
        const updateFormData = this.props.updateFormData;
        const saveCalendar = this.props.saveCalendar;
        const toggleEmbedCodeModal = this.props.toggleEmbedCodeModal;
        const hasBeenUpdated = this.props.calendar.hasBeenUpdated;
        const showEmbedCode = this.props.calendar.showEmbedCode;
        return (
            <div className="inner-page container-fluid HomePage">
                <div className="row">
                    <div className="col-sm-4 col-md-3 no-padding">
                        <div className="module" style={{minHeight: window.innerHeight - 67}}>
                            <div className="input-group">
                                <TextInput
                                    name="name"
                                    label="Title"
                                    value={formData.name}
                                    onChange={updateFormData}
                                />
                                <SubdomainInput
                                  name="subdomain"
                                  label="Booking Page"
                                  value={formData.subdomain}
                                  onChange={updateFormData}
                                />
                                <MoneyInput
                                    name="price_per_meeting"
                                    label="Meeting Cost"
                                    value={formData.price_per_meeting}
                                    onChange={updateFormData}
                                />
                                <TimeInput
                                    name="meeting_length"
                                    label="Meeting Length"
                                    value={formData.meeting_length}
                                    onChange={updateFormData}
                                />
                                <TimeInput
                                    name="meeting_padding"
                                    label="Padding between meetings"
                                    value={formData.meeting_padding}
                                    onChange={updateFormData}
                                />
                            </div>
                            <button
                                onClick={hasBeenUpdated ? saveCalendar : null}
                                className={hasBeenUpdated ? 'btn btn-blue center' : 'btn btn-disabled center'}
                            >
                                Save
                            </button>
                            <a onClick={toggleEmbedCodeModal} className="embed-code-button">Get embed code</a>
                        </div>
                    </div>
                    <div className="col-sm-8 col-md-9">
                        <div id="ck-widget" />
                    </div>
                </div>
                <EmbedCodeModal
                    isOpen={showEmbedCode}
                    onRequestClose={toggleEmbedCodeModal}
                    calendar={formData.uuid}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateFormData: (key, value) => {
            dispatch(calendarActions.updateFormData(key, value));
        },
        loadCalendars: () => {
            dispatch(calendarActions.loadCalendars());
        },
        saveCalendar: (e) => {
            e.preventDefault();
            dispatch(calendarActions.saveCalendar());
        },
        toggleEmbedCodeModal: () => {
            dispatch(calendarActions.toggleEmbedCodeModal());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        calendar: state.calendar,
        loggedInUser: state.appState.loggedInUser,
        jwt: state.appState.jwt
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);
