// src/components/GameCanvas.js
import React, { useEffect, useState } from 'react';
import initGame from '../game';

const GameCanvas = () => {
  const [gameInstance, setGameInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize the game once the component mounts
    let game = null;

    const startGame = () => {
      // Create the game instance
      game = initGame();
      setGameInstance(game);
      setIsLoading(false);
    };

    // Start the game
    startGame();

    // Cleanup function
    return () => {
      if (game) {
        game.destroy(true);
      }
    };
  }, []);

  return (
    <div className="game-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-text">Loading Game...</div>
        </div>
      )}
      <div id="game-container" />
    </div>
  );
};

export default GameCanvas;