
import React, { useState, useEffect } from "react";
import "./App.css";

import Start from "./components/Start"
import Lobby from "./components/Lobby"

import socket from "./socketConfig";

// const socket = io();
// const ENDPOINT = 'http://localhost:3001'

function App() {
  
  const [gamerName, setGamerName] = useState(''); // User Gamer ID
  const [host, setHost] = useState(null); // Indicate if a user is a host
  const [lobby, setLobby] = useState(""); // Game/Lobby # 
  const [lobbyCreated, setLobbyCreated] = useState(null); 
  const [serverConfirmed, setServerConfirmed] = useState(false);

  React.useEffect(() => {
    // socket.on('disconnect', () => {
    //   setIsConnected(false);
    // });
    
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

  socket.on('joinConfirmed', (lobby) => {
    console.log("joinConfirmed ---> lobby ID: " + lobby);
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
  const onJoin = () => {
    console.log("onJoin: " + lobby)
    if (host === false) {
      socket.emit('joining', {lobby: lobby} ) 
      // setLobby(id);
      // setServerConfirmed(true);
    }
  }

  // Is there a way I can use this for leaving a Lobby? 
  const onBack = () => {
    setHost(null);
    setLobbyCreated(null);
    setServerConfirmed(false);
  }

  const onTyping = (e)=>{
    const target = e.target.name
    switch(target){
      case 'name':
        setGamerName(e.target.value);
        break;
      case 'lobby':
        setLobby(e.target.value); 
    }
  }

  const onReset = (e) => {
    setLobby("")
  }

  const StartLobby = (serverConfirmed) => {
    switch(serverConfirmed) {
      case (false):
        return (     
          <div className="App-Lobby">
            <Start host={host} lobby={lobby} name={gamerName} onChoice={onChoice} onCreate={onCreate} onJoin={onJoin} onBack={onBack} onTyping={onTyping} />
          </div> 
        );
        case (true):
          return (        
            <div className="App-Lobby">
              <Lobby host={host} lobby={lobby} name={gamerName} onBack={onBack} onReset={onReset} />
            </div> 
          )
        break;
      }
    }

      return (
        <div className="App">
          <header className="App-header">
            <p>Connected: { serverConfirmed === true ? "Yes" : "Loading" }</p>
            <p>{ lobby !== "" ? "  " + lobby : "" }</p>
          </header>    
          <div className="App-body">    
            {StartLobby(serverConfirmed)}
          </div>
        </div>
      ) 

}

export default App;