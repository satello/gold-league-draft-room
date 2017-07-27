import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import $ from 'jquery';

import './style.scss';

class ChatLog extends Component {

  shouldComponentUpdate(nextProps) {
    // only update if we have a new message
    if (this.props.messageState.messageList.length === nextProps.messageState.messageList.length) {
      if (this.props.messageState.messageList[0] !== nextProps.messageState.messageList[0]) {
        return true;
      }
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    $(".chat-log").stop().animate({ scrollTop: $(".chat-log")[0].scrollHeight}, 1000);
  }

  render() {
    let messageList = [];
    if (this.props.messageState) messageList = this.props.messageState.messageList;

    messageList = _.map(messageList, (message) => {
      return (
        <div className="message">{message}</div>
      );
    });

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
