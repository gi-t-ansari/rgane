import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, APP_URL } from "../config";

const Auth = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      axios
        .get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res?.data);
          navigate(APP_URL.HOME);
        })
        .catch((err) => console.error(err));
    }
  }, [navigate, setUser]);

  const loginWithGoogle = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={loginWithGoogle}>Login with Google</button>
    </div>
  );
};

export default Auth;
