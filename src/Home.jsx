import Left from "./views/LeftView/Left"
import Right from "./views/RightView/Right"
import Login from "./components/Login"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Home() {
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    const handleGetToken = async () => {
        try {
            const response = await axios.get('http://localhost:5001/gettoken', {
                withCredentials: true,
            });
            setMessage(response.data.message);
            setToken(response.data.token);
            setError('');
        } catch (err) {
            console.log("err",err)
            setError(err.response ? err.response.data.error : 'An error occurred');
            setMessage('');
            setToken('');
        }
    };

    useEffect(() => {
        handleGetToken();
    }, []);
    return (
        <>
            <div className="mainApp flex">
                {
                    <><Left />
                        <Right /></>
                }
            </div>
        </>
    )
}

export default Home;