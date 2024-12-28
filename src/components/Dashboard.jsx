import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/Context";

function Dashboard() {
    const { loginData, setLoginData } = useContext(LoginContext)
    const navigate = useNavigate();
    const dashValid = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("Please Login First")
                navigate('/login')
                return;
            }

            const res = await axios.get("http://localhost:5000/validuser", {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setLoginData(res.data.validuser)

        } catch (error) {
            console.error("Error validating user:", error.response?.data || error.message);
            if (error.response?.status === 401) {
                console.log('Unauthorized');
                toast.error("Unauthorized")
                // Redirect to login
                // window.location.href = "/login";
            }
        }
    };




    useEffect(() => {
        dashValid();
    }, []);
    return (<>
        <h2 className="flex items-center justify-center bold text-3xl">This is Dashboard of @{loginData.name}</h2>
    </>);
}

export default Dashboard;