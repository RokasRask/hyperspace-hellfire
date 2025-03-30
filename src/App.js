// src/App.js
import React from 'react';
import GameCanvas from './components/GameCanvas';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hyperspace Hellfire</h1>
      </header>
      <main>
        <GameCanvas />
      </main>
      <footer>
        <p>Controls: Arrow Keys to move, Space to shoot, Z for special attack</p>
      </footer>
    </div>
  );
}

export default App;