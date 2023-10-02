import React, { useContext } from 'react';
import Add from '../Utils/img/add.png';
import Cam from '../Utils/img/cam.png';
import More from '../Utils/img/more.png';
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from '../Context/ChatContext';


function Chat() {
  const{data} = useContext(ChatContext)
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat