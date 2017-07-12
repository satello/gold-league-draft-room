import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { requestJwt } from '../../actions/socket';

import './style.scss';

class TokenLogin extends Component {

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
    return (
      <div className="token-login">
        <h3> Enter User Information to Enter Draft Room </h3>
        <form onSubmit={this.fetchToken.bind(this)}>
          <label htmlFor="nameInput">Name</label>
          <input id="nameInput" type="text" />
          <label htmlFor="capInput">Available Funds</label>
          <input id="capInput" type="number" />
          <label htmlFor="spotsInput">Spots Available</label>
          <input id="spotsInput" type="number" defaultValue={null}/>
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
    }
  }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenLogin);
