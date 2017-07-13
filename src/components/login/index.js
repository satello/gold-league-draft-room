import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { requestJwt } from '../../actions/socket';
import { fetchBidders } from '../../actions/bidders';

import './style.scss';

class TokenLogin extends Component {
  componentWillMount() {
    if (!this.props.bidderState.biddersLoaded) {
      this.props.getBidders();
    }
  }

  fetchToken(event) {
    event.preventDefault();

    const name = document.getElementById("nameInput");
    const cap = document.getElementById("capInput");
    const spots = document.getElementById("spotsInput");

    if (!name.value || !cap.value) {
      // FIXME actually show user where they fucked up
      return;
    }

    const user = {
      "name": name.value,
      "cap": cap.value,
      "spots": spots.value
    };
    localStorage.setItem("user", JSON.stringify(user));

    this.props.requestJwt();
  }

  render() {
    if (!this.props.bidderState || !this.props.bidderState.biddersLoaded) return false;

    const bidders = this.props.bidderState.bidders;
    const bidderOptions = []
    for (var i=0; i<bidders.length; i++) {
      bidderOptions.push(
        <option value={bidders[i].name}>{bidders[i].name}</option>
      )
    }
    return (
      <div className="token-login">
        <h3> Select your bidder identity to login </h3>
        <form onSubmit={this.fetchToken.bind(this)}>
          <select>{bidderOptions}</select>
          <input type="submit" value="Enter" />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestJwt: () => {
      dispatch(requestJwt());
    },
    getBidders: () => {
      dispatch(fetchBidders());
    }
  }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenLogin);
