import React, { useState } from 'react';
import './Lobby.css'

import Maps from '../Maps';
import Game from './Game';

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

*/
const Lobby = ({host, lobby, name, onBack, onReset}) => {
  console.log("Lobby component")


  const [players, setPlayers] = useState([]);
  const [displayPlayers, setDisplayPlayers] = useState([]);
  const [ready, setReady] = useState(false);
  const [start, setStart] = useState(false);
  const [indexMap, setIndexMap] = useState(0);

  React.useEffect(() => {   
    var obj = {
      id:'',
      name:'',
      ready: false,
    }
    let arr = [];
    arr.push(obj);
    arr.push(obj);
    arr.push(obj);
    arr.push(obj);
    arr.push(obj);
    setDisplayPlayers(arr);

    socket.emit('newLobbyJoin', {lobby, name})

    return () => {
      console.log("Closing useEffect().... ")
    };
  }, []);

  
  // Update displayPlayers (players --> newPlayers) 
  // check if players[i] is in displayPlayers
    // if doesn't exist, add 
  socket.on('starting', (players) => {
    setPlayers(players);
  });

  socket.on('kicked', ({players, kickedPlayerName}) => {
    setPlayers(players);

    // Kicked user will be taken back to main menu
    if (name === kickedPlayerName) {
      setPlayers([]);
      setDisplayPlayers([]);
      setReady(false);
      onBack();  
      onReset(); // from Apps.js
    }
  });

  socket.on('ready', (players) => {
    setPlayers(players);
  });

  socket.on('startingGame', (players) => {
    setStart(true);
  });

  const handleKick = (player) => {
    socket.emit('kick', {lobby, player});
  }

  const handleReady = (e) => {
    // If a host starts, then just starts the game 
    if (host == true) {
      socket.emit('setStart', {lobby});
    } else {
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

  const StartReady = host ? "START" : ready ? "Clicked" : "Ready"
  switch(start) {
    case (true):
      return (     
        <>
          <Game lobby={lobby} name={name} players={players} map={indexMap} />
        </> 
      );
      case (false):
        return (        
          <>
            <div className='Lobby'>
              <div className='Lobby-Header'>
                <h1>Lobby ID: {lobby} Host: {host.toString()} Ready: {ready.toString()}  </h1>
              </div>
              
              <div className='Lobby-Body'>
                <div className='Lobby-Players'>
                <div>
                    { players[0] !== undefined  ? 
                      <div>
                        <h3>{players[0].name}</h3>
                        {players[0].ready.toString()}
                        <button onClick={() => {handleKick(players[0].id)}}>Kick</button>
                      </div> : <div>No Player Joined</div>
                    }
                  </div>
                  <div>
                    { players[1] !== undefined ? 
                      <div>
                        <h3>{players[1].name}</h3>
                        {players[1].ready.toString()}
                        <button onClick={() => {handleKick(players[1].id)}}>Kick</button>
                      </div> : <div>No Player Joined</div>
                    }
                  </div>
                  <div>
                    { players[2] !== undefined ? 
                      <div>
                        <h3>{players[2].name}</h3>
                        {players[2].ready.toString()}
                        <button onClick={() => {handleKick(players[2].id)}}>Kick</button>
                      </div> : <div>No Player Joined</div>
                    }  
                  </div>  
                  <div>
                    { players[3] !== undefined ? 
                      <div>
                        <h3>{players[3].name}</h3>
                        {players[3].ready.toString()}
                        <button onClick={() => {handleKick(players[3].id)}}>Kick</button>
                      </div> : <div>No Player Joined</div>
                    }  
                  </div>  
                  <div>
                    { players[4] !== undefined ? 
                      <div>
                        <h3>{players[4].name}</h3>
                        {players[4].ready.toString()}
                        <button onClick={() => {handleKick(players[4].id)}}>Kick</button>
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
      break;
  }
    



}

export default Lobby;