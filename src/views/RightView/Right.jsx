import dp from "../../assets/Images/DP.png"
import AllMessages from "./AllMessages"
import useConversation from "../../stateManage/useConversation"
import "./Right.css"
import useSendMessage from "../../context/useSendMessage";
import { useState } from "react";
import { useSocketContext } from "../../context/socketContext";
export default function Right() {
    const { selectedConversation } = useConversation();
    const [message, setMessage] = useState("");
    const { loading, sendMessages } = useSendMessage();


    const { onlineUsers } = useSocketContext();
    const getOnlineUsersStatus = (userId) => {
        return onlineUsers.includes(userId) ? "Online" : "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendMessages(message);
        setMessage("");
    };
    if (loading || !selectedConversation) {
        return (
            <div style={{ width: "65%" }} className="noChat flex items-center justify-center ">
                <h1 className="bold-300 text-2xl text-center">No Conversation Started <br></br>
                    Select a Conversation to Start</h1>
            </div>
        );
    }
    return (<>
        <div className="right">

            <div className="rightMain">
                <div className="rightChatInfo border-b-4">
                    <div className="chatInfo  flex items-center">
                        <div className={`avatar ${getOnlineUsersStatus(selectedConversation._id) ? "online" : ""}`}>
                            <div className="dp me-2">
                                <img src={dp} alt="" />
                            </div>
                        </div>
                        <div className="chatName">
                            <p>{selectedConversation?.name || "Mudasir "}</p>
                            <p>{getOnlineUsersStatus(selectedConversation._id)}</p>
                        </div>
                    </div>
                </div>
                <div className="chatContainer flex flex-col">
                    {/* Chat Messages */}
                    <div className="chatMessages flex-grow overflow-y-auto max-h-[80vh]">
                        <AllMessages />

                    </div>

                    {/* Chat Input */}
                    <div className="chatInputs w-full relative">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Type here"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="input w-[96%] mt-3 input-bordered pl-4 pr-10"
                            />
                            <button type="submit"><i className="bi bi-send absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"></i></button>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    </>)
}

// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:5001'); // Connect to the Socket.IO server

// function Right() {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         // Listen for messages from the server
//         socket.on('receive_message', (data) => {
//             setMessages((prev) => [...prev, data]);
//         });

//         return () => {
//             socket.disconnect(); // Clean up when component unmounts
//         };
//     }, []);

//     const sendMessage = () => {
//         if (message.trim() !== '') {
//             socket.emit('send_message', message); // Send message to the server
//             setMessage('');
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <h1>Socket.IO Chat</h1>
//             <div style={{ border: '1px solid black', padding: '10px', height: '300px', overflowY: 'scroll' }}>
//                 {messages.map((msg, index) => (
//                     <div key={index} style={{ margin: '5px 0' }}>
//                         {msg}
//                     </div>
//                 ))}
//             </div>
//             <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type your message..."
//                 style={{ width: '80%', marginRight: '10px' }}
//             />
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// }

// export default Right;
