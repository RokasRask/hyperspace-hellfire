import React from 'react';
import './styles/App.css'; // Main app styles [cite: 17]
import GameCanvas from './components/GameCanvas'; // The component that will hold the Phaser game [cite: 7]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hyperspace Hellfire</h1>
      </header>
      <main>
        <GameCanvas />
      </main>
    </div>
  );
}

export default App;