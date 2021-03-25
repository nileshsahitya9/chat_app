import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './join.css';


const Join = () => {

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    return (
        <div className="join_main_container">
            <div className="join_sub_container">
                <div className="join_inner_container">
                    <div className="join_form_field">
                        <h3> Join a chat </h3>
                    </div>
                    <div className="join_form_field">
                        <div>
                            <label> Display Name</label>
                        </div>
                        <div>
                            <input type="text" placeholder="eg. Mr spectacular" name="name" autoFocus onChange={(event) => setName(event.target.value)} ></input>
                        </div>
                    </div>
                    <div className="join_form_field">
                        <label> Room Name</label>
                        <input type="text" placeholder="eg. Mystic Falls" name="room" autoFocus onChange={(event) => setRoom(event.target.value)} ></input>
                    </div>
                    <div className="join_form_field">
                        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                            <button type="submit">Join</button>
                        </Link>
                    </div>
                </div >
                <div className="copyright">
                    <h3>Made with
                    <span className="heart"><i className="fa fa-heart"></i></span>
                    By Nilesh Sahitya</h3>

            </div>
        </div>
        </div >
    );
};

export default Join;