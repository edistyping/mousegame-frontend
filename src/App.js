
import React, { useState, useEffect } from "react";
import "./App.css";

import Start from "./components/Start"
import Lobby from "./components/Lobby"

import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:3001'
const socket = io();



function App() {
  
  const [data, setData] = useState(null); // Test
  const [gamerName, setGamerName] = useState('Player 1'); // User Gamer ID
  const [host, setHost] = useState(null); // Indicate if a user is a host
  const [lobby, setLobby] = useState(""); // Game/Lobby # 
  const [lobbyCreated, setLobbyCreated] = useState(null); 
  const [serverConfirmed, setServerConfirmed] = useState(false);

  const [isConnected, setIsConnected] = useState(socket.connected);

  React.useEffect(() => {

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    
    return () => {
      console.log("Closing useEffect().... ")
      socket.off('connect');
      socket.off('disconnect');
    
    };
  }, []);

  socket.on('newGameCreated', (lobby) => {
    console.log("newGameCreated ---> lobby ID: " + lobby);
    setLobby(lobby);
    setServerConfirmed(true);
  });


  // Determine if we are creating a new Game or joining one
  function onChoice(choice) {
    const host = choice === "new" ? true: false;

    if (host === true) {
      setLobbyCreated(true); 
    }

    setHost(host);
  }

  // Create and open a new Lobby  
  const onCreate = () => {
    console.log("onCreate() is called")
    if (host === true) {
      socket.emit('newGame');
    } 
  }
  
  // Open a Lobby and provide Server lobby-ID 
  const onJoin = (id) => {
    if (host === false) {
      socket.emit('joinGame', {lobby: id} ) 
      setLobby(id);
    }
  }

  // Is there a way I can use this for leaving a Lobby? 
  const onBack = () => {
    setHost(null);
    setLobbyCreated(null);
  }

  const onTyping = (e)=>{
    //gamerName
    const target = e.target.name
    
    switch(target){
      case 'name':
        setGamerName(e.target.value);
        break;
      case 'lobby':
        setLobby(e.target.value); 
    }
  }

  // Render
  switch(serverConfirmed) {
    case (false):
      return (
        <div className="App">
          <header className="App-header">
            <p>Connected: { isConnected === true ? "Yes" : "Loading" }</p>
            <p>{ lobby !== "" ? "  " + lobby : "" }</p>
          </header>
    
          <div className="App-body">
    
            <div className="App-Lobby">
              <Start host={host} lobby={lobby} name={gamerName} onChoice={onChoice} onCreate={onCreate} onJoin={onJoin} onBack={onBack} onTyping={onTyping} />
            </div> 
          </div>
        </div>
      );
      case (true):
        return (
          <div className="App">
            <header className="App-header">
              <p>Connected: { isConnected === true ? "Yes" : "Loading" }</p>
              <p>{ lobby !== "" ? "  " + lobby : "" }</p>
            </header>
      
            <div className="App-body">
      
              <div className="App-Lobby">
                <Lobby host={host} lobby={lobby} gamerName={gamerName} />
              </div> 
            </div>
          </div>
        )
      break;
    }


}

export default App;