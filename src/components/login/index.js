import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import { fetchBidders } from '../../actions/bidders';
import { authorizeBidder } from '../../actions/socket';

import './style.scss';

class TokenLogin extends Component {
  componentWillMount() {
    if (!this.props.bidderState.biddersLoaded) {
      this.props.getBidders();
    }
  }

  loginWithUser(event) {
    event.preventDefault();

    const select = document.getElementById("bidder-select");
    const bidderId = select.value;

    // FIXME kind of hacky
    let user = _.filter(this.props.bidderState.bidders, function(o) {
      return o.bidderId == bidderId;
    })[0]

    const userJSON = {
      "name": user.name,
      "cap": user.cap,
      "spots": user.spots
    };

    // mmmmmm mehbeh
    localStorage.setItem("bidderId", bidderId);
    localStorage.setItem("user", JSON.stringify(userJSON));

    this.props.authorizeBidder();
  }

  render() {
    if (!this.props.bidderState || !this.props.bidderState.biddersLoaded) return false;

    const bidders = this.props.bidderState.bidders;
    const bidderOptions = []
    for (var i=0; i<bidders.length; i++) {
      console.log(bidders[i].name + ' ' + bidders[i].activeConnection);
      if (!bidders[i].activeConnection) {
        bidderOptions.push(
          <option value={bidders[i].bidderId}>{bidders[i].name}</option>
        )
      }
    }
    return (
      <div className="token-login">
        <h3> Select your bidder identity to login </h3>
        <form onSubmit={this.loginWithUser.bind(this)}>
          <select id="bidder-select">{bidderOptions}</select>
          <input type="submit" value="Enter" />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBidders: () => {
      dispatch(fetchBidders());
    },
    authorizeBidder: (token) => {
      dispatch(authorizeBidder(token))
    }
  }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenLogin);
