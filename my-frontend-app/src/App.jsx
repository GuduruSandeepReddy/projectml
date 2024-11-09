import { useState } from 'react';
import './App.css'; 

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mode) {
      alert('Please select either Email or SMS');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: input, mode }),
      });

      const data = await response.json();
      setResult(data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Spam Classifier</h1>
      
      <div className="button-container">
        <button 
          className={`mode-button ${mode === 'Email' ? 'active' : ''}`} 
          onClick={() => setMode('Email')}
        >
          Email
        </button>
        <button 
          className={`mode-button ${mode === 'SMS' ? 'active' : ''}`} 
          onClick={() => setMode('SMS')}
        >
          SMS
        </button>
      </div>

      <div className="mode-indicator">
        {mode ? <p>Currently Classifying: <strong>{mode}</strong></p> : <p>Please select Email or SMS.</p>}
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <label>
          Enter the message:
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-box"
          />
        </label>
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {result && (
        <div className="result">
          <h2>Prediction Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
