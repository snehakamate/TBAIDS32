import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const apiOptions = {
  Prime: 'p',
  Fibonacci: 'f',
  Even: 'e',
  Random: 'r',
};

function App() {
  const [selectedType, setSelectedType] = useState('Prime');
  const [result, setResult] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleFetch = async () => {
    setIsFetching(true);
    try {
      const res = await axios.get(`http://localhost:9876/numbers/${apiOptions[selectedType]}`);
      setResult(res.data);
    } catch (err) {
      console.error('Unable to retrieve data:', err);
      setResult({ error: 'Request failed' });
    }
    setIsFetching(false);
  };

  return (
    <div className="App">
      <h1>🧮 Real-Time Number Average Service</h1>

      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        {Object.keys(apiOptions).map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <button onClick={handleFetch}>Get Numbers</button>

      {isFetching && <p>Fetching data...</p>}

      {result && (
        <div className="output">
          <h2>Result</h2>
          {result.error ? (
            <p className="error">{result.error}</p>
          ) : (
            <pre>{JSON.stringify(result, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
// App.js
// This is the main React component for the frontend of the average microservice.
// It allows users to select a type of number sequence and fetches the average of the numbers from the backend service.
// The component uses Axios to make HTTP requests to the backend service and displays the results in a user-friendly format.
// The user can select from four types of number sequences: Prime, Fibonacci, Even, and Random.