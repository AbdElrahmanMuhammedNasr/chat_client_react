import React, { useState } from "react";
import { Link } from "react-router-dom";
import uuid from 'react-uuid'


const Join = () => {
  const [name, setName] = useState("");
  // const [room, setRoom] = useState("");

  return (
    <div className="container w-50 p-2" style={{
      backgroundColor:'gray',
      margin:'10% auto',
      textAlign:'center'
    }}>
      <input className="form-control"
        placeholder="Name"
        type="text"
        onChange={({target}) => setName(target.value)}/>

{/* 
      <input
        placeholder="room"
        type="text"
        onChange={({target}) => setRoom(target.value)}/> */}


      <Link
        onClick={(event) => (!name  ? event.preventDefault() : null)}
        to={`/chat?name=${name}&room=${uuid()}`}
      >
        <button className="btn btn-primary" type="submit">Join</button>
      </Link>
    </div>
  );
};
export default Join;
