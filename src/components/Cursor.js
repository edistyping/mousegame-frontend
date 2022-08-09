import React from "react";
// import { useContext } from "react"; used later
import useMousePosition from "./UseMousePosition";
// import { MouseContext } from "../../context/mouse-context"; used from step6

import './Cursor.css'

const Cursor = () => {

//      image size ==> height: 700px   width: 1200px;

const { x, y } = useMousePosition();

  return (
    <>
      <div
        className={"dot"}
        // className={`dot ${cursorType}`} used from step6
        style={{ left: `${x}px`, top: `${y}px` }}
      ></div>
    </>
  );
};
export default Cursor;