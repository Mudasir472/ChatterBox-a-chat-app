import React, { useEffect, useRef } from "react";
import useGetMessage from "../../context/usegetMessage";
import Message from "./Message";
import useGetSocketMessage from "../../context/useGetSocketMessage";
function Messages() {

    const { loading, messages } = useGetMessage();
    const lastMsgRef = useRef();
    useGetSocketMessage(); // listing incoming messages
    useEffect(() => {
        setTimeout(() => {
            if (lastMsgRef.current) {
                lastMsgRef.current.scrollIntoView({
                    behavior: "smooth",
                });
            }
        }, 100);
    }, [messages]);
    return (
        <div
            className="flex-1 overflow-y-auto"
            style={{ minHeight: "calc(87vh - 8vh)" }}
        >
            {loading ? (
                <div>
                    <div className="noChat">
                        <h1>Select a Conversation to Start</h1>
                    </div>
                </div>
            ) : (
                messages?.length > 0 &&
                messages.map((message) => (
                    <div  ref={lastMsgRef}>
                        <Message message={message} />
                    </div>
                ))

            )}

            {!loading && messages?.length === 0 && (
                <div>
                    <p className="text-center mt-[20%]">
                        Say! Hi to start the conversation
                    </p>
                </div>
            )}
        </div>
    );
}

export default Messages;