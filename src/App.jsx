import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { LoginContext } from "./context/Context";

import Left from "./views/LeftView/Left";
import Right from "./views/RightView/Right";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Error from "./components/Error";
import Dashboard from "./components/Dashboard";
import Loader from "./components/Loader";

function App() {
  const { loginData, setLoginData } = useContext(LoginContext);
  // const navigate = useNavigate();
  useEffect(() => {
    const dashValid = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please Login First");
          // navigate('/login')

          return;
        }

        const res = await axios.get("http://localhost:5000/validuser", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setLoginData(res.data.validuser);
      } catch (error) {
        console.error("Error validating user:", error.response?.data || error.message);
        if (error.response?.status === 401) {
          toast.error("Unauthorized");
        }
      }
    };

    dashValid();
  }, [setLoginData]);
  return (
    <BrowserRouter>
      <Toaster reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            (loginData?.length !== 1) ? (
              <div className="mainApp flex">
                <Left />
                <Right />
              </div>
            ) : (
              // <Navigate to="/login" />
              <Login />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
