import { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "./AuthProvider";
import io from "socket.io-client";
import { LoginContext } from "./Context";
const socketContext = createContext();

// Custom hook to use the socket context
export const useSocketContext = () => {
    return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { loginData, setLoginData } = useContext(LoginContext)

    useEffect(() => {
        // console.log("LD", loginData?._id);

        if (loginData) {
            const socket = io("http://localhost:5000", {
                query: {
                    userId: loginData?._id,
                },
            });
            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });
            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [loginData]);
    return (
        <socketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </socketContext.Provider>
    );
};