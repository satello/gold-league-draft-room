import React, { Component } from 'react';
import { connect } from 'react-redux';

// style
import './style.scss';

import PlayerAvatar from '../../components/playerAvatar';


class NominationBox extends Component {

  render() {
    if (!this.props.playerState) return false;
    return (
      <div className="nomination-box">
        <PlayerAvatar player={this.props.playerState.selectedPlayer} />
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

export default connect(mapStateToProps, mapDispatchToProps)(NominationBox);
