import React, { useEffect, useRef } from 'react';
import { launch } from '../game'; // Import the launch function from game/index.js
import '../styles/UI.css'; // Optional: If you have specific styles for the canvas container

const GameCanvas = () => {
  const gameContainer = useRef(null); // Ref to hold the div where the game canvas will be added
  const gameInstance = useRef(null); // Ref to hold the Phaser game instance

  useEffect(() => {
    // Ensure the game is only initialized once
    if (gameContainer.current && !gameInstance.current) {
      // The ID 'game-container' here MUST match the 'parent' ID in your Phaser config (src/game/index.js)
      gameInstance.current = launch(gameContainer.current.id);
      console.log('Phaser game launched in GameCanvas');
    }

    // Cleanup function: Destroy the Phaser game instance when the component unmounts
    return () => {
      if (gameInstance.current) {
        gameInstance.current.destroy(true); // true removes the canvas element
        gameInstance.current = null;
        console.log('Phaser game destroyed');
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    // This div is where the Phaser canvas will be injected by the game config
    <div id="game-container" ref={gameContainer} style={{ width: '800px', height: '600px', margin: 'auto' }}>
      {/* The Phaser canvas will appear inside this div */}
    </div>
  );
};

export default GameCanvas;