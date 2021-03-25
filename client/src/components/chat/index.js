import React, { useState, useEffect } from 'react';

import queryString from 'query-string';
import io from "socket.io-client";
import moment from 'moment';
import ScrollToBottom from 'react-scroll-to-bottom';
import 'font-awesome/css/font-awesome.min.css';

import './chat.css';

let socket;


const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState({
        isTyping: false,
        userName: ''
    });
    const ENDPOINT = 'https://private-chat-room-app.herokuapp.com/';



    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });


        setRoom(room);
        setName(name);

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    useEffect(() => {

        socket.on('message', message => {
            setMessages(msgs => [...msgs, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, []);


    useEffect(() => {
        socket.on("isTypingMessage", ({ user }) => {
            setTyping({
                isTyping: true,
                userName: user
            });
        });

        socket.on("doneTypingMessage", () => {
            setTyping({
                isTyping: false,
                userName: ''
            });
        });
    }, [message])

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    const typingMessage = (msg) => {
        setMessage(msg);
        socket.emit('typing', message);
    }



    const trimmedName = name.trim();

    const { isTyping, userName } = typing
    return (
        <div className="chat_container">
            <div className="chat_sidebar">
                <div className="chat_roomname_container">
                    <h3>{room}</h3>
                </div>
                <div className="chat_users">
                    <div>
                        <ol>
                            {users && users.map(({ name }) => (
                                <li>{name}</li>
                            )
                            )}
                        </ol>
                    </div>
                </div>
            </div>

            <div className="chat__main">
                <ScrollToBottom className="chat_message_inner_container">
                    <ol className="chat_message_container">
                        {messages.map((item, index) => (
                            <>
                                {
                                    item.user !== trimmedName ?

                                        <li className="messages talk-bubble tri-right round left-top" key={index}>
                                            <div className="message_title">
                                                <h4>{item.user}</h4>
                                                <span>{moment(item.created_at).format("h:mm a")}</span>
                                            </div>
                                            <div className="message_body">
                                                <p>{item.text}</p>

                                            </div>

                                        </li> :

                                        < li className="self__message talk-bubble tri-right round right-top" key={index} >
                                            <div className="self__message__title">
                                                <span>{moment(item.created_at).format("h:mm a")}</span>
                                                <h4>MySelf</h4>

                                            </div>
                                            <div className="self__message__body">
                                                <p>{item.text}</p>

                                            </div>

                                        </li>
                                }

                            </>
                        ))}
                    </ol>
                </ScrollToBottom>
                {
                    isTyping &&
                    <div className="message_typing_container">
                        <p><em>{`${userName} is typing...`}</em></p>
                    </div>
                }
                <div className="chat_footer">
                    <div className="chat_footer_container">
                        <input type="text" value={message} name="message" autoComplete="off" placeholder="Enter Message" onChange={(e) => typingMessage(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null} />
                        <button onClick={(e) => sendMessage(e)}
                        ><i className="fa fa-paper-plane" /></button>
                    </div>
                </div>

            </div>

        </div >
    );

}

export default Chat;