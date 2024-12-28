import React, { useEffect, useState } from "react";
import useConversation from "../stateManage/useConversation.js";
import axios from "axios";
const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    useEffect(() => {
        const getMessages = async () => {

            setLoading(true);
            if (selectedConversation && selectedConversation._id) {
                try {
                    const token = localStorage.getItem('token');
                    const res = await axios.get(
                        `http://localhost:5000/api/message/getmessage/${selectedConversation._id}`,
                        {
                            withCredentials: true,
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    setMessages(res.data?.messages);
                    setLoading(false);
                } catch (error) {
                    console.log("Error in getting messages", error);
                    setLoading(false);
                }
            }
        };
        getMessages();
    }, [selectedConversation, setMessages]);
    return { loading, messages };
};

export default useGetMessage;