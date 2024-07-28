import React from 'react';
import logo from './logo.svg';
import './App.css';
import getVsCodeApi from './utils/vscode';

function App() {
  // Function to handle the button click
  const handleButtonClick = () => {
    const vscode = getVsCodeApi(); // Get the VS Code API
    vscode.postMessage({
      action: 'OPEN_TERMINAL', // Define your action
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload !!!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          <button onClick={handleButtonClick}>Send Message to VS Code</button>
        </p>
      </header>
    </div>
  );
}

export default App;
