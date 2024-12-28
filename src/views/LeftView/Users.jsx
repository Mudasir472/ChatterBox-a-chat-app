// import dp from "../../assets/Images/DP.png"
import "./Left.css"
// function Users() {
//     return (<>
{/* <div className="chats">
    <div className="chatsMain flex items-center justify-evenly">
        <div className="chatInfo flex items-center">
            <div className="dp me-2">
                <img src={dp} alt="" />
            </div>
            <div className="chatName">
                <p>Mudasir</p>
                <p>muddu@gmail.com</p>
            </div>
        </div>
        <div className="chatTime">
            <p>Today</p>
        </div>
    </div>
</div> */}
//     </>);
// }

import useGetAllUsers from "../../context/useGetAllUsers";
import User from "./User";

// export default Users;

function Users() {
    const [allUsers, loading] = useGetAllUsers();
    return (<>
        <div className="chats">
            <div className="">
                <div
                >
                    {allUsers.map((user, index) => (
                        <User key={index} user={user} />
                    ))}
                </div>
            </div>
        </div>
    </>);
}

export default Users;