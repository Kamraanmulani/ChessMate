import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import './GamePvP.css';

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

const GamePvP = () => {
  const navigate = useNavigate();
  const [game, setGame] = useState(new Chess());
  const [gameStatus, setGameStatus] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('White');
  const [moveHistory, setMoveHistory] = useState([]);
  const { width, height } = useWindowSize();

  // Calculate board size with padding - make it extremely small for compact layout
  const boardSize = Math.min(Math.min(width, height) * 0.15, 160);

  const handleBackToMenu = () => {
    navigate('/gamemode');
  };

  const handleNewGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setGameStatus('');
    setCurrentPlayer('White');
    setMoveHistory([]);
  };

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = new Chess(g.fen());
      modify(update);
      return update;
    });
  }

  function updateGameStatus(currentGame) {
    if (currentGame.isGameOver()) {
      if (currentGame.isCheckmate()) {
        const winner = currentGame.turn() === 'w' ? 'Black' : 'White';
        setGameStatus(`Checkmate! ${winner} wins!`);
      } else if (currentGame.isDraw()) {
        setGameStatus('Draw!');
      } else if (currentGame.isStalemate()) {
        setGameStatus('Stalemate!');
      }
    } else if (currentGame.isCheck()) {
      setGameStatus(`${currentGame.turn() === 'w' ? 'White' : 'Black'} is in check!`);
    } else {
      setGameStatus('');
    }
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
    
    // Update move history
    setMoveHistory(prev => [...prev, move.san]);
    
    // Switch current player
    setCurrentPlayer(game.turn() === 'w' ? 'White' : 'Black');
    
    // Update game status
    updateGameStatus(game);
    
    return true;
  }

  return (
    <div className="game-pvp-container">
      <div className="game-header">
        <h1>Player vs Player</h1>
        <p>Challenge another human player</p>
        
        <div className="current-turn">
          <div className={`turn-indicator ${currentPlayer.toLowerCase()}`}>
            Current Turn: <strong>{currentPlayer}</strong>
          </div>
        </div>
        
        {gameStatus && (
          <div className="game-status">
            {gameStatus}
          </div>
        )}
      </div>
      
      <div className="game-board-section">
        <div className="chessboard-container">
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            boardWidth={Math.max(150, Math.min(boardSize, 200))}
            customBoardStyle={{
              borderRadius: '3px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e74c3c',
            }}
          />
        </div>
        
        <div className="game-info-panel">
          <div className="move-history">
            <h3>Move History</h3>
            <div className="moves-list">
              {moveHistory.length === 0 ? (
                <p className="no-moves">No moves yet</p>
              ) : (
                moveHistory.map((move, index) => (
                  <div key={index} className="move-item">
                    <span className="move-number">{Math.floor(index / 2) + 1}.</span>
                    <span className={`move-notation ${index % 2 === 0 ? 'white-move' : 'black-move'}`}>
                      {move}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="game-stats">
            <h3>Game Stats</h3>
            <div className="stat-item">
              <span>Total Moves:</span>
              <span>{moveHistory.length}</span>
            </div>
            <div className="stat-item">
              <span>In Check:</span>
              <span>{game.isCheck() ? 'Yes' : 'No'}</span>
            </div>
            <div className="stat-item">
              <span>Game Over:</span>
              <span>{game.isGameOver() ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
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

export default GamePvP;