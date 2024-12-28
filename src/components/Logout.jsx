import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            const token = localStorage.getItem("token");

            try {
                await axios.get("http://localhost:5000/logout", {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                // Clear token from local storage
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                toast.success("Logout Successfully");
                console.log("Logout function called");
                navigate("/login");
            } catch (error) {
                toast.error("Something wents wrong");
                console.error("Error during logout:", error);

                navigate("/login");
            }
        };

        logoutUser();
    }, [navigate]);

    return (
        <div>
            <h2>Logging out...</h2>
        </div>
    );
};

export default Logout;
