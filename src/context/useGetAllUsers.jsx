import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                // const token = Cookies.get("jwt");
                const token = localStorage.getItem('token');
                const response = await axios.get("http://localhost:5000/allusers", {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAllUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Error in useGetAllUsers: " + error);
            }
        };
        getUsers();
    }, []);
    return [allUsers, loading];
}

export default useGetAllUsers;