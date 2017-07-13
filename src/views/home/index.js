import React, {Component} from 'react';
import { connect } from 'react-redux';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import { openAuctionRoom } from '../../actions/app';

import './style.scss';

const RulesInputs = () => {

  return (
    <div className="rules-inputs">
      <h3>Basic Auction Rules</h3>
      <label htmlFor="limitedSpots">Limited Spots Per Bidder</label>
      <input id="limitedSpots" type="checkbox" value="limitedSpots" /> <br />

      <label htmlFor="allSpotsFilled">Must Fill All Spots</label>
      <input id="allSpotsFilled" type="checkbox" value="allSpotsFilled" /> <br />

      <label htmlFor="useAutoNominate">Auto Nominate items based on order in spreadsheet</label>
      <input id="useAutoNominate" type="checkbox" value="useAutoNominate" /> <br />

      <label htmlFor="minSecondsPerItem">Seconds Each Item Open for bidding </label>
      <input id="minSecondsPerItem" type="number" defaultValue={25} /> <br />

      <label htmlFor="resetTimerOnBid">Reset Timer on Bid</label>
      <input id="resetTimerOnBid" type="checkbox" value="resetTimerOnBid" defaultChecked /> <br />

      <label htmlFor="resetSeconds">Seconds to Reset to</label>
      <input id="resetSeconds" type="number" defaultValue={15} /> <br />
    </div>
  )
}

const PlayersInput = () => {
  return (
    <div className="players-input">
      <h3> Google Sheet Id for Auction Items </h3>
      <p> Note: Spreadsheet must be public </p>
      <input id="spreadsheetId" type="text" placeholder="1YDb26U8rCV0ISmumHt_oa1VIEcZvEhVeC8Z9B59JoIQ" />
    </div>
  )
}

const SortableItem = SortableElement(({value}) =>
  <li className="bidder-li">{value}</li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul className="bidder-list">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={"Name: " + value.name + ", Cap: $" + value.cap + ", Spots: " + value.spots} />
      ))}
    </ul>
  );
});


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bidders: []
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      bidders: arrayMove(this.state.bidders, oldIndex, newIndex),
    });
  };

  showNewBidder() {
    const modal = document.getElementById('newBidderModal');
    modal.style.display = "block";
  }

  closeModal() {
    const modal = document.getElementById('newBidderModal');
    modal.style.display = "none";
  }

  addBidder(event) {
    console.log("here");
    event.preventDefault();
    const name = document.getElementById('name');
    const cap = document.getElementById('cap');
    const spots = document.getElementById('spots');

    if (!name.value || !cap.value) {
      name.style.border = "1px solid red";
      cap.style.border = "1px solid red";
      return;
    }

    const biddersCopy = this.state.bidders.slice();
    biddersCopy.push({
      "name": name.value,
      "cap": cap.value,
      "spots": spots.value
    });

    this.setState({
      bidders: biddersCopy
    });

    name.value = null;
    cap.value = null;
    spots.value = null;
    this.closeModal();
  }

  newDraftRoom() {
    // FIXME use state instead?
    // rules
    const limitedSpots = document.getElementById("limitedSpots");
    const allSpotsFilled = document.getElementById("allSpotsFilled");
    const useAutoNominate = document.getElementById("useAutoNominate");
    const minSecondsPerItem = document.getElementById("minSecondsPerItem");
    const resetTimerOnBid = document.getElementById("resetTimerOnBid");
    const resetSeconds = document.getElementById("resetSeconds");

    const rules = {
      "limitedSpots": limitedSpots.checked,
      "allSpotsFilled": allSpotsFilled.checked,
      "useAutoNominate": useAutoNominate.checked,
      "minSecondsPerItem": minSecondsPerItem.value,
      "resetTimerOnBid": resetTimerOnBid.checked,
      "resetSeconds": resetSeconds.value
    }

    // Google sheet
    // TODO ignore for now

    const payload = Object.assign({}, this.state, rules)
    this.props.openAuctionRoom(payload);
  }

  render() {
    if (this.props.appState && this.props.appState.hasRoomId) {
      return (
        <div className="home">
          <div className="roomId-box">
            <h3>Woohoo! You have a draft room open</h3>
            <p>This room will remain open for 24 hours</p>
            <h4>Your Room ID</h4>
            <p>{this.props.appState.roomId}</p>
            <a href={`http://localhost:3000/${this.props.appState.roomId}`}>Click Here to go to Auction Room</a>
          </div>
        </div>
      )
    } else {
      return (
        <div className="home">
          <div className="continue-btn">
            <div className="new-draft-room-btn btn" onClick={this.newDraftRoom.bind(this)}>Open Auction Room</div>
          </div>
          <div className="content">
            <div className="row">
              <div className="col-md-6">
                <h1> Create New Auction Room </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="new-room-form" onSubmit={(e) => {e.preventDefault();}}>
                  <RulesInputs />
                  <PlayersInput />
                </form>
              </div>
              <div className="col-md-6">
                <div className="bidder-inputs">
                  <h3> Bidders </h3>
                  <p> Drag the list to make a bidding order (if not using auctioneer) </p>
                  <div className="add-bidder" onClick={this.showNewBidder.bind(this)}>Add Bidder</div>
                  <div id="newBidderModal" className="modal">
                    <div className="modal-content">
                      <span className="close" onClick={this.closeModal.bind(this)}>&times;</span>
                      <form onSubmit={this.addBidder.bind(this)}>
                        <h4>New Bidder</h4>
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="name" />
                        <br />
                        <label htmlFor="cap">Cap($): </label>
                        <input type="number" id="cap" />
                        <br />
                        <label htmlFor="spots">Spots: </label>
                        <input type="number" id="spots" />
                        <br />
                        <input type="submit" value="submit" />
                      </form>
                    </div>
                  </div>
                  <SortableList items={this.state.bidders} onSortEnd={this.onSortEnd} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openAuctionRoom: (payload) => {
      dispatch(openAuctionRoom(payload));
    }
  }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
