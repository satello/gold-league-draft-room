import React from 'react';

// style
import './style.scss';

import ChatInput from '../../components/chatInput';
import ChatLog from '../../components/chatLog';


export default (props) => (
    <div className="chat-box">
      <ChatLog />
      <ChatInput />
    </div>
);
