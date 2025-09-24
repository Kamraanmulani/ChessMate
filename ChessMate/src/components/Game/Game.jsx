import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import './Game.css';

// Custom hook to get the window size
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}

const Game = () => {
  const navigate = useNavigate();
  const [game, setGame] = useState(new Chess());
  const [gameStatus, setGameStatus] = useState('');
  const { width, height } = useWindowSize();

  // Calculate board size with padding
  const boardSize = Math.min(width, height) - 100;

  const handleBackToMenu = () => {
    navigate('/gamemode');
  };

  const handleNewGame = () => {
    setGame(new Chess());
    setGameStatus('');
  };

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = new Chess(g.fen());
      modify(update);
      return update;
    });
  }

  function onDrop(sourceSquare, targetSquare) {
    let move = null;
    safeGameMutate((game) => {
      move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Always promote to queen for simplicity
      });
    });
    
    if (move === null) return false;
    
    // Update game status
    if (game.isGameOver()) {
      if (game.isCheckmate()) {
        setGameStatus(`Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins!`);
      } else if (game.isDraw()) {
        setGameStatus('Draw!');
      } else if (game.isStalemate()) {
        setGameStatus('Stalemate!');
      }
    } else if (game.isCheck()) {
      setGameStatus(`${game.turn() === 'w' ? 'White' : 'Black'} is in check!`);
    } else {
      setGameStatus('');
    }
    
    return true;
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Chess Game</h1>
        <p>Welcome to /gamestarts - Interactive Chess Game</p>
        {gameStatus && (
          <div className="game-status">
            {gameStatus}
          </div>
        )}
      </div>
      
      <div className="chessboard-container">
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          boardWidth={Math.max(300, Math.min(boardSize, 600))}
          customBoardStyle={{
            borderRadius: '8px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            border: '3px solid #4ecdc4',
          }}
        />
      </div>
      
      <div className="game-controls">
        <button className="game-btn" onClick={handleNewGame}>
          New Game
        </button>
        <button className="game-btn">Settings</button>
        <button className="game-btn back-btn" onClick={handleBackToMenu}>
          ⬅ Back to Menu
        </button>
      </div>
    </div>
  );
};

export default Game;