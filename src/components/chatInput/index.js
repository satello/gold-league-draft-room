import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.scss';

import * as messageActions from '../../actions/messages';

class ChatInput extends Component {
  newMessage(event) {
    event.preventDefault();
    let msg = document.getElementById("msg");

    if (msg.value) {
      this.props.sendChatMessage(msg.value);
      msg.value = "";
    }
  }

  render() {
    return(
      <div className="chat-input">
        <form id="chat-input-form" onSubmit={this.newMessage.bind(this)}>
            <div className="row">
              <div className="col-md-2">
                <input type="submit" value="Send" />
              </div>
              <div className="col-md-10">
                <input type="text" id="msg" size="64"/>
              </div>
            </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendChatMessage: (msg) => {
      dispatch(messageActions.sendChatMessage(msg));
    }
  }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
