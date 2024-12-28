import Users from "./Users";
import "./Left.css"
import { useState } from "react";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../stateManage/useConversation";

export default function Left() {
    const [search, setSearch] = useState("");
    const [allUsers] = useGetAllUsers();
    const { setSelectedConversation } = useConversation();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        const conversation = allUsers.find((user) =>
            user.name?.toLowerCase().includes(search.toLowerCase())
        );
        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else {
            toast.error("User not found");
        }
    };
    return (<>
        <div className="left min-h-screen">
            <div className="leftMain flex flex-col items-center ">
                <div className="leftSearch w-4/5 my-4 flex items-center border border-gray-300 rounded">
                    <i className="bi bi-search px-3 text-gray-500"></i>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="input  w-full max-w-xs focus:outline-none"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                </div>

                <div className="allChats  border w-4/5 flex flex-col h-80 overflow-y-auto overflow-x-hidden">
                    <Users />



                </div>
            </div>
        </div>
    </>)
}   