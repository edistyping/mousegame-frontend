import React, { useState } from 'react';
import './Lobby.css'

import Maps from '../Maps';

import socket from "../socketConfig";

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
const Lobby = ({host, lobby, name, onBack}) => {
  console.log("Lobby component" + name)

  // Join the Lobby using provided ID
  // Get Lobby information
  const [players, setPlayers] = useState([]);
  const [ready, setReady] = useState(false);
  const [start, setStart] = useState(false);
  const [indexMap, setIndexMap] = useState(0);


  socket.on('starting', (players) => {
    console.log("players ID! ");
    console.log(players);
    setPlayers(players);
  });
  
  // Kicked Player needs to get back to main page
  socket.on('kicked', (player) => {
    console.log("You have been kicked!");
    onBack();
  });

  const handleKick = (player) => {
    console.log("handleKick clicked lobby: " + lobby + "  id: " + player)
    socket.emit('kick', {lobby, player});
  }

  const handleReady = (e) => {
    if (host == false && ready === false) {
      socket.emit('setReady', {lobby, name});
      setReady(true);
    }
    else if (host == false && ready === true) {
      socket.emit('setReady', {lobby, name});
      setReady(false);
    }
    else if (host == true) {
      // When a host just starts 
      socket.emit('setReady', {lobby, name});
    } 
  }

  const handleMapChange = () => {
    if (indexMap >= Maps.length - 1)
      setIndexMap(0);
    else {
      setIndexMap(indexMap + 1);
    }
  }

  React.useEffect(() => {
    // socket.on('connect', () => {
    // });    
    // socket.on('disconnect', () => {
    // });
    
    socket.emit('newLobbyJoin', {lobby, name})

    return () => {
      console.log("Closing useEffect().... ")
      // socket.off('connect');
      // socket.off('disconnect');
      
    };
  }, []);

  const StartReady = host ? "START" : ready ? "Clicked" : "Ready"
  return (
    <>
      <div className='Lobby'>
        <div className='Lobby-Header'>
          <h1>Lobby ID: {lobby} Host: {host.toString()} Ready: {ready.toString()}  </h1>
        </div>

        <div className='Lobby-Body'>
          <div className='Lobby-Players'>
          <div>
              { players[0] !== undefined ? 
                <div>
                  <h3>{players[0][1]}</h3>
                  {players[0][2]}
                  <button onClick={() => {handleKick(players[0][0])}}>Kick</button>
                </div> : <div>No Player Joined</div>
              }
            </div>
            <div>
              { players[1] !== undefined ? 
                <div>
                  <h3>{players[1][1]}</h3>
                  {players[1][2].toString()}
                  --{players[1][0]}
                  <button onClick={() => {handleKick(players[1][0])}}>Kick</button>
                </div> : <div>No Player Joined</div>
              }
            </div>
            <div>
              { players[2] !== undefined ? 
                <div>
                  <h3>{players[2][1]}</h3>
                  {players[2][2]}
                  <button onClick={() => {handleKick(players[2][0])}}>Kick</button>
                </div> : <div>No Player Joined</div>
              }  
            </div>  
            <div>
              { players[3] !== undefined ? 
                <div>
                  <h3>{players[3][1]}</h3>
                  {players[3][2]}
                  <button onClick={() => {handleKick(players[3][0])}}>Kick</button>
                </div> : <div>No Player Joined</div>
              }  
            </div>  
            <div>
              { players[4] !== undefined ? 
                <div>
                  <h3>{players[4][1]}</h3>
                  {players[4][2]}
                  <button onClick={() => {handleKick(players[4][0])}}>Kick</button>
                </div> : <div>No Player Joined</div>
              }  
            </div>  
          </div>    

          <div className='Lobby-Footer'>
            <div className='Lobby-Buttons'>
              <button name="ready" onClick={handleReady}> {StartReady} </button>
              <button name="exit" onClick={onBack} >Exit (Remove self from server)</button>          
            </div> 

            <div className='Lobby-Map'>
              <div className='Map'>
                <img src={Maps[indexMap]} alt="image"/>
              </div>

              <div className='Lobby-Map-Buttons'>
                <button name="leftMap" onClick={handleMapChange} >L--</button>
                <button name="rightMap" onClick={handleMapChange} >--R</button>
              </div>
            </div>

          </div>

        </div>

    
      </div>
    </>
  )
}

export default Lobby;