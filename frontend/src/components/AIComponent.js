import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../config";

const AIComponent = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const generateContent = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/ai/generate`,
        { prompt: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResponse(res?.data?.response);
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };
  return (
    <div>
      <h2>AI Content Generator</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter prompt"
      />
      <button onClick={generateContent}>Generate</button>
      {response && (
        <p>
          <strong>Response:</strong>
          {response}
        </p>
      )}
    </div>
  );
};

export default AIComponent;
