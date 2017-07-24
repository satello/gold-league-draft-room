import React from 'react'

import './style.scss';

const PlayerAvatar = (props) => {
  return (
    <div className="player-avatar">
      <h4>
        {props.player ? props.player.name : ''}
      </h4>
      <p>
        {props.player ? props.player.position: ''}
      </p>
      <p>
        {props.player ? "Bye: " + props.player.bye: ''}
      </p>
    </div>
  )
}

export default PlayerAvatar
