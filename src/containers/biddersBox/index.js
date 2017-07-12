import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.scss';

import * as bidderActions from '../../actions/bidders';

class BidderBox extends Component {
  getBidders() {
    console.log("starting");
    this.props.getBidders();
  }

  render() {
    return(
      <div className="bidder-box">
        <div onClick={this.getBidders.bind(this)}>Get Bidders</div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBidders: () => {
      dispatch(bidderActions.fetchBidders());
    }
  }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(BidderBox);
