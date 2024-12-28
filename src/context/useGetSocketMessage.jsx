import React, { useEffect } from "react";
// import sound from "../assets/notification.mp3";
import sound from '../assets/noti.wav'
import { useSocketContext } from "./socketContext";
import useConversation from "../stateManage/useConversation";
const useGetSocketMessage = () => {
    const { socket } = useSocketContext();
    const { messages, setMessage } = useConversation();

    useEffect(() => {
        socket.on("newMessage", (newMessage) => {
            const notification = new Audio(sound);
            notification.play();
            setMessage([...messages, newMessage]);
        });
        return () => {
            socket.off("newMessage");
        };
    }, [socket, messages, setMessage]);
};
export default useGetSocketMessage;
