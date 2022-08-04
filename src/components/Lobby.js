import React, { useState } from 'react';
import './Lobby.css'

import io from 'socket.io-client';
import qs from 'qs'

const socket = io();
const ENDPOINT = 'http://localhost:3001'

/*
    User gets Green color. All others are Red color
    How does server notify Users?

    - Allow Users to Ready/Unready 
      = onClick -> On
    - Allow Users to Chat
      = onSubmit -> On
      = Emit -> Receive message
    - Allow Users to Leave
      = onClick -> On 
    - Allow Host to change maps
      = onClick -> On 
    - Allow Host to kick players
      = OnClick -> On
    - Allow Host to Start 
      = OnClick -> On 
    - Allow Host to Leave (Cancel the game)
        Return User to Start.js page

    Need to communicate with Server
        Connect to Lobby
        Get Lobby info (Lobby, Map )
        Get Players info (Name, Ready)
*/
const Lobby = ({host, lobby, gamerName}) => {

  
  // Join the Lobby using provided ID
  // Get Lobby information
  const [players, setPlayers] = useState([]);
  const [ready, setReady] = useState(false);
  const [start, setStart] = useState(false);

  socket.on('pieceAssignment', (name, lobby) => {
    console.log("lobby ID: " + lobby + ' -' + name);
  });

  socket.on('starting', (gameState, players, turn) => {
    console.log("players ID!! ");
    console.log(players);
    setPlayers(players);
  });

  const name = gamerName    
  console.log("Inside Lobby.js --> Lobby: " + lobby + "  name: " + name);
  socket.emit('newLobbyJoin', {lobby, name})

  React.useEffect(() => {
    socket.on('connect', () => {
    });    
    socket.on('disconnect', () => {
    });

    // const {lobby2, name} = qs.parse(window.location.search, {
    //   ignoreQueryPrefix: true
    //  })    
    return () => {
      console.log("Closing useEffect().... ")
      socket.off('connect');
      socket.off('disconnect');
      
    };
  }, []);



  const StartReady = host ? "START" : "READY"
  return (
    <>
      <div className='Lobby'>
        <div className='Lobby-Header'>
          <h1>Lobby ID: {lobby} </h1>
        </div>

        <div className='Lobby-Body'>
          <div className='Lobby-Players'>
            <div>
              <h3>Player 1</h3>
              (Ready Status) 
              <button>Kick</button>
            </div>
            <div></div>
            <div>3</div>  
            <div>4</div>
            <div>No Player Joined</div>
          </div>    

          <div className='Lobby-Footer'>
            <div className='Lobby-Buttons'>
              <button>{StartReady} (Start/ready)</button>
              <button>Exit (Remove self from server)</button>          
            </div> 

            <div className='Lobby-Map'>
              <div>
                image here
              </div>

              <div>
                <button>Change Map (left)</button>
                <button>Change Map (right)</button>
              </div>
            </div>

          </div>

        </div>

    
      </div>
    </>
  )
}

export default Lobby;