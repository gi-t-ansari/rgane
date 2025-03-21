import React, { useState, useEffect, use } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Auth from "./components/Auth";
import Payment from "./components/Payment";
import AIComponent from "./components/AIComponent";
import { APP_URL } from "./config";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res?.data))
        .catch(() => setUser(null));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <nav>
        <Link to={APP_URL.HOME}>Home</Link>
        {user ? (
          <>
            <Link to={APP_URL.AI}>AI Generator</Link>
            <Link to={APP_URL.PAYMENT}>Subscription</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to={APP_URL.LOGIN}>Link</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route
          path={APP_URL.HOME}
          element={<h1>Welcome to AI Content Generator</h1>}
        />
        <Route
          path={APP_URL.LOGIN}
          element={
            user ? <Navigate to={APP_URL.HOME} /> : <Auth setUser={setUser} />
          }
        />
        <Route
          path={APP_URL.PAYMENT}
          element={
            user ? (
              <Payment stripePromise={stripePromise} />
            ) : (
              <Navigate to={APP_URL.LOGIN} />
            )
          }
        />
        <Route
          path={APP_URL.AI}
          element={user ? <AIComponent /> : <Navigate to={APP_URL.LOGIN} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
