import React, { useState } from 'react';
import './Game.css'

import Maps from '../Maps';
import Cursor from './Cursor';
import Canvas from './Canvas';

import socket from "../socketConfig";


/*
    1. Is there a way to keep the mouse contained inside a box?
        - Is there a way to calculate exact coordinates of image?     
    2. Is there a way to keep the mouse inside 'starting zone'?
        = manually set up coordinates for starting position for each map
    3. Is there a way to tell which color i am hovering on? 
        - Is there a library for this? 

*/

const Game = ({lobby, name, players, map}) => {
    console.log("Game component")

    const [victory, setVictory] = useState(false);
    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
        ctx.fill()
      }

  return (
    <>
        <div className='Game'>
            <div className='Game-Header'>
                Players' Name here {JSON.stringify(players)}
            </div>

            <div className='Game-Body'>
                <Cursor />
                <Canvas draw={draw} />            
            </div>
        </div>
    </>
  )
}

export default Game;