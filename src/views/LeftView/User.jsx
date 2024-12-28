import dp from "../../assets/Images/DP.png"
import "./Left.css"
import useConversation from "../../stateManage/useConversation.js"
import { useSocketContext } from "../../context/socketContext.jsx";

function User({ user }) {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === user._id;
    const { socket, onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(user._id);
    return (<>
        <div className="chats">
            <div className={`chatsMain duration-300 ${isSelected ? "setBg" : ""} flex items-center justify-between`} onClick={() => { setSelectedConversation(user) }}>
                <div className="chatInfo flex items-center">
                    <div className={`avatar ${isOnline ? "online" : ""}`}>
                        <div className="dp me-2">
                            <img src={dp} alt="" />
                        </div>
                    </div>
                    <div className="chatName">
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div className="chatTime">
                    <p>Today</p>
                </div>
            </div>
        </div>
    </>);
}

export default User;