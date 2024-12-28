import React from "react";

function Message({ message }) {
    const authUser = JSON.parse(localStorage.getItem("user"));

    const itsMe = message?.senderId === authUser?._id;


    const chatName = itsMe ? " chat-end" : "chat-start";
    const chatColor = itsMe ? "bg-blue-500" : "";

    const createdAt = new Date(message?.createdAt);
    const formattedTime = createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return (
        <div>
            <div className="">
                <div className={`chat ${chatName}`}>
                    <div className={`chat-bubble text-white ${chatColor}`}>
                        {message?.message || "I am Muddu"}
                    </div>
                    <div className="chat-footer">{formattedTime}</div>
                </div>
            </div>
        </div>
    );
}

export default Message;