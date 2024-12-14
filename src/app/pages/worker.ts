self.onmessage = async (event) => {
  const input = event.data;

  try {
    console.log("Worker received input:", input); // Debug: Log received input

    // Send the input to the backend
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      throw new Error(`Backend error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Worker received response from backend:", data); // Debug: Log backend response

    // Send the backend response back to the main thread
    postMessage(data);
  } catch (error) {
    console.error("Worker encountered an error:", error);
    postMessage("Error communicating with the backend.");
  }
};
