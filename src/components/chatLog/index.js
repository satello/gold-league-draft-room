import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import './style.scss';

import * as messageActions from '../../actions/messages';

class ChatLog extends Component {

  render() {
    let messageList = [];
    if (this.props.messageState)
      messageList = this.props.messageState.messageList;

    messageList = _.map(messageList, (message) => {
      return (
        <div className="message">{message}</div>
      )
    })

    return(
      <div className="chat-log">
        <div className="log">
        { messageList }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatLog);
