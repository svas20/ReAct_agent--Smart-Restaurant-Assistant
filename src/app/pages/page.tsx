"use client";

import { useState, useEffect } from "react";

function Pass() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    // Initialize the web worker
    const newWorker = new Worker(new URL('./worker.ts', import.meta.url));

    // Listen for messages from the worker
    newWorker.onmessage = (event) => {
      console.log("Frontend received response from worker:", event.data); // Debug: Log worker response
      setResponse(event.data); // Update the response state
    };

    // Save the worker instance to state
    setWorker(newWorker);

    return () => {
      newWorker.terminate(); // Clean up the worker on unmount
    };
  }, []);

  const handleSend = () => {
    if (inputValue && worker) {
      console.log("Sending input to worker:", inputValue); // Debug: Log input sent to worker
      worker.postMessage(inputValue); // Send the input value to the worker
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Send Input to Backend</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type something..."
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "300px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <button
        onClick={handleSend}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Send to Backend
      </button>
      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <strong>Response from Backend:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default Pass;
