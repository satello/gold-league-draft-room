import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/AvailabilitiesPage.css';

import * as calendarActions from '../reducers/calendar/actions';


class AvailabiltiesPage extends Component {
    componentWillMount() {
        this.props.loadCalendars();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.calendar.id && (nextProps.hasLoaded && !this.props.hasLoaded)) {
            const widget = new window.ConsultationKit();
            widget.init({
                targetEl: "#ck-widget",
                localConfig: true,
                userId:  nextProps.appState.loggedInUser.id,
                editCalendar: true,
                calendarId: nextProps.calendar.id,
                apiToken: nextProps.appState.jwt,
                baseUrl: process.env.REACT_APP_API_ENDPOINT,
                calendar_name: 'Set your availability',
                goToFirstEvent: true,
                timezone: nextProps.calendar.timezone,
                localization: {
                    showTimezoneHelper: false
                },
                fullCalendar: {
                    header: {
                        left: '',
                        center: '',
                        right: ''
                    },
                    views: {
                        agenda: {
                            displayEventEnd: true,
                            columnFormat: 'ddd'
                        }
                    },
                    allDaySlot: false,
                    nowIndicator: false
                }
            });
        }
    }
    render() {
        return (
            <div>
                <div className="inner-page container-fluid AvailabilitiesPage">
                    <div className="row">
                        <div className="col-sm-12 col-md-10 no-padding">
                            <div className="module" style={{minHeight: window.innerHeight - 67}}>
                                <div id="ck-widget"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCalendars: () => {
            dispatch(calendarActions.loadCalendars());
        },
    }
};

const mapStateToProps = (state) => {
    return {
        appState: state.appState,
        calendar: state.calendar.formData,
        hasLoaded: state.calendar.hasLoaded
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailabiltiesPage);

