import React, { useState } from 'react';
import './Start.css'

const Start = ({host, gamerName, onChoice, onCreate, onJoin, onBack, onTyping}) => {

  const [lobbyID, setLobbyID] = useState("");

  switch(host) {
    case (null):
      return (
        <div className="Start">
          <div className='Start-Header'>
            <h1>Mouse Race {host}</h1>
          </div>
          <div className="Start-Buttons">
            <button onClick={() => {onChoice("new")}} choice="new" >Start a Game</button>
            <button onClick={onChoice} choice="join" >Join a Game</button>
          </div>
        </div>
      );
    case (true):
      return (
        <div className="Create">
          <h2 id="Start-Heaer">New Game</h2>
          <div>
            <p>Provide a Gamer Name {host}</p><input type="text" onChange={onTyping} placeholder='Your Name?'></input>
          </div>
          
          <div>
            <button onClick={onBack}>Back</button>
            <button onClick={onCreate}>Create</button>
          </div>
        </div>
      )
      break;
    case(false):
      return( 
        <div className="Join">
          <div className='Join-Header'>
            <h2 id="Start-Heaer">Join a Game</h2>
          </div>

          <div className="Join-Body">
            <div className="Join-Input">
              <input placeholder='Your Name?'></input>
              <input value={lobbyID} onChange={e => setLobbyID(e.target.value)} placeholder='Enter Lobby #'></input>
            </div>

            <div className="Join-Buttons">
              <button onClick={onBack}>Back</button>
              <button onClick={() => {onJoin(lobbyID)}}>Join</button>
            </div>
          </div>

        </div>
      )
      break;      
  }


}



export default Start;