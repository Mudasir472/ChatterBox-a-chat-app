import React, { useState } from "react";
import useConversation from "../stateManage/useConversation.js";
import axios from "axios";
const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const sendMessages = async (message) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');

            const res = await axios.post(
                `http://localhost:5000/api/message/send/${selectedConversation._id}`,
                { message },
                {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessages([...messages, res.data.newMessage]);
            // console.log("newM", res?.data?.newMessage)
            setLoading(false);
        } catch (error) {
            console.log("Error in send messages", error);
            setLoading(false);
        }
    };
    return { loading, sendMessages };
};

export default useSendMessage;