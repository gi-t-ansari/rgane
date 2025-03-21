import axios from "axios";
import React from "react";
import {
  useStripe,
  useElements,
  Elements,
  CardElement,
} from "@stripe/react-stripe-js";
import { API_URL } from "../config";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${API_URL}/payment/checkout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const result = await stripe.redirectToCheckout({
        sessionId: data?.sessionId,
      });

      if (result?.error) {
        console.error(result?.error?.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleCheckout}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Subscribe Now
      </button>
    </form>
  );
};

const Payment = ({ stripePromise }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
