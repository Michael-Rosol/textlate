import React, { useState } from 'react';

const Login = () => {
  const [size, setSize] = useState("");

  const generateText = () => {
    // Your text generation logic here
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-blue-700 text-center text-xl mb-4">Test</h2>
      <div className="flex items-center mb-4">
        <textarea
          className="border rounded p-2 mr-2 resize-none focus:outline-none"
          rows={5}
          cols={40}
          placeholder="Enter your prompt here..."
        ></textarea>
        <button
          id="generateText"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 rounded shadow focus:outline-none"
          onClick={generateText}
        >
          Generate Text
        </button>
      </div>
    </div>
  );
};

export default Login;
