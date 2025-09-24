import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import './GameAI.css';

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

// Simple AI Engine for chess moves
class SimpleAI {
  constructor(difficulty = 3) {
    this.difficulty = difficulty; // 1-5 scale
  }

  async makeMove(chess) {
    const moves = chess.moves({ verbose: true });
    if (moves.length === 0) return null;

    // Add thinking delay based on difficulty
    const thinkTime = Math.random() * 1000 + 500 + (this.difficulty * 200);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        let bestMove;
        
        if (this.difficulty === 1) {
          // Easy: Random moves
          bestMove = moves[Math.floor(Math.random() * moves.length)];
        } else if (this.difficulty <= 3) {
          // Medium: Prefer captures and checks
          const captures = moves.filter(move => move.captured);
          const checks = moves.filter(move => {
            const testChess = new Chess(chess.fen());
            testChess.move(move);
            return testChess.inCheck();
          });
          
          if (captures.length > 0 && Math.random() < 0.7) {
            bestMove = captures[Math.floor(Math.random() * captures.length)];
          } else if (checks.length > 0 && Math.random() < 0.4) {
            bestMove = checks[Math.floor(Math.random() * checks.length)];
          } else {
            bestMove = moves[Math.floor(Math.random() * moves.length)];
          }
        } else {
          // Hard: Basic evaluation
          bestMove = this.evaluateMoves(chess, moves);
        }
        
        resolve(bestMove);
      }, thinkTime);
    });
  }

  evaluateMoves(chess, moves) {
    let bestMove = moves[0];
    let bestScore = -Infinity;

    const pieceValues = {
      'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 0
    };

    for (const move of moves) {
      let score = 0;
      
      // Prefer captures
      if (move.captured) {
        score += pieceValues[move.captured.toLowerCase()] * 10;
      }
      
      // Prefer promotions
      if (move.promotion) {
        score += pieceValues[move.promotion.toLowerCase()] * 8;
      }
      
      // Prefer checks
      const testChess = new Chess(chess.fen());
      testChess.move(move);
      if (testChess.inCheck()) {
        score += 5;
      }
      
      // Prefer central squares
      const centralSquares = ['d4', 'd5', 'e4', 'e5'];
      if (centralSquares.includes(move.to)) {
        score += 2;
      }
      
      // Add randomness
      score += Math.random() * 2;
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    
    return bestMove;
  }
}

const GameAI = () => {
  const navigate = useNavigate();
  const [game, setGame] = useState(new Chess());
  const [gameStatus, setGameStatus] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('White');
  const [moveHistory, setMoveHistory] = useState([]);
  const [difficulty, setDifficulty] = useState(3);
  const [aiThinking, setAiThinking] = useState(false);
  const [playerColor, setPlayerColor] = useState('white');
  const [ai] = useState(new SimpleAI(difficulty));
  const { width, height } = useWindowSize();

  // Calculate board size with padding - make it extremely small for compact layout
  const boardSize = Math.min(Math.min(width, height) * 0.15, 160);

  // Update AI difficulty when changed
  useEffect(() => {
    ai.difficulty = difficulty;
  }, [difficulty, ai]);

  // Navigate to game start AI route
  useEffect(() => {
    // This component represents the AI game that has started
    // The route should be /gamestartsAI as requested
    const currentPath = window.location.pathname;
    if (!currentPath.includes('/gamestartsAI')) {
      navigate('/gamestartsAI', { replace: true });
    }
  }, [navigate]);

  const handleBackToMenu = () => {
    navigate('/gamemode');
  };

  const handleNewGame = useCallback(() => {
    const newGame = new Chess();
    setGame(newGame);
    setGameStatus('');
    setCurrentPlayer('White');
    setMoveHistory([]);
    setAiThinking(false);
    
    // If player chose black, let AI make first move
    if (playerColor === 'black') {
      setTimeout(() => makeAIMove(newGame), 500);
    }
  }, [playerColor]);

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

  const makeAIMove = useCallback(async (currentGame) => {
    if (currentGame.isGameOver()) return;
    
    const isAITurn = (playerColor === 'white' && currentGame.turn() === 'b') ||
                     (playerColor === 'black' && currentGame.turn() === 'w');
    
    if (!isAITurn) return;

    setAiThinking(true);
    
    try {
      const aiMove = await ai.makeMove(currentGame);
      
      if (aiMove) {
        const newGame = new Chess(currentGame.fen());
        const move = newGame.move(aiMove);
        
        if (move) {
          setGame(newGame);
          setMoveHistory(prev => [...prev, move.san]);
          setCurrentPlayer(newGame.turn() === 'w' ? 'White' : 'Black');
          updateGameStatus(newGame);
        }
      }
    } catch (error) {
      console.error('AI move error:', error);
    } finally {
      setAiThinking(false);
    }
  }, [ai, playerColor]);

  // Make AI move when it's AI's turn
  useEffect(() => {
    if (!aiThinking && !game.isGameOver()) {
      const isAITurn = (playerColor === 'white' && game.turn() === 'b') ||
                       (playerColor === 'black' && game.turn() === 'w');
      
      if (isAITurn) {
        const timer = setTimeout(() => makeAIMove(game), 300);
        return () => clearTimeout(timer);
      }
    }
  }, [game, playerColor, aiThinking, makeAIMove]);

  function onDrop(sourceSquare, targetSquare) {
    // Check if it's player's turn
    const isPlayerTurn = (playerColor === 'white' && game.turn() === 'w') ||
                        (playerColor === 'black' && game.turn() === 'b');
    
    if (!isPlayerTurn || aiThinking) return false;

    let move = null;
    safeGameMutate((gameRef) => {
      move = gameRef.move({
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

  const handleDifficultyChange = (event) => {
    setDifficulty(parseInt(event.target.value));
  };

  const handleColorChange = (color) => {
    setPlayerColor(color);
    handleNewGame();
  };

  const getDifficultyLabel = (level) => {
    const labels = {
      1: 'Beginner',
      2: 'Easy',
      3: 'Medium',
      4: 'Hard',
      5: 'Expert'
    };
    return labels[level] || 'Medium';
  };

  return (
    <div className="game-ai-container">
      <div className="game-header">
        <h1>Player vs AI</h1>
        <p>Challenge our artificial intelligence</p>
        
        <div className="difficulty-selector">
          <label htmlFor="difficulty">Difficulty:</label>
          <select 
            id="difficulty"
            className="difficulty-select" 
            value={difficulty} 
            onChange={handleDifficultyChange}
          >
            <option value={1}>Beginner</option>
            <option value={2}>Easy</option>
            <option value={3}>Medium</option>
            <option value={4}>Hard</option>
            <option value={5}>Expert</option>
          </select>
          <span>({getDifficultyLabel(difficulty)})</span>
        </div>

        <div className="color-selector">
          <label>Play as:</label>
          <div className="color-buttons">
            <button 
              className={`color-btn ${playerColor === 'white' ? 'active' : ''}`}
              onClick={() => handleColorChange('white')}
            >
              White
            </button>
            <button 
              className={`color-btn ${playerColor === 'black' ? 'active' : ''}`}
              onClick={() => handleColorChange('black')}
            >
              Black
            </button>
          </div>
        </div>
        
        <div className="current-turn">
          <div className={`turn-indicator ${currentPlayer.toLowerCase()}`}>
            Current Turn: <strong>{currentPlayer}</strong>
          </div>
        </div>
        
        {aiThinking && (
          <div className="ai-thinking">
            <div className="thinking-spinner"></div>
            <span>AI is thinking...</span>
          </div>
        )}
        
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
            boardOrientation={playerColor}
            boardWidth={Math.max(150, Math.min(boardSize, 200))}
            customBoardStyle={{
              borderRadius: '3px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #3498db',
            }}
            customDarkSquareStyle={{ backgroundColor: '#779952' }}
            customLightSquareStyle={{ backgroundColor: '#edeed1' }}
            arePiecesDraggable={!aiThinking}
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
              <span>Difficulty:</span>
              <span>{getDifficultyLabel(difficulty)}</span>
            </div>
            <div className="stat-item">
              <span>Your Color:</span>
              <span style={{ textTransform: 'capitalize' }}>{playerColor}</span>
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
        <button className="game-btn" onClick={handleNewGame} disabled={aiThinking}>
          New Game
        </button>
        <button className="game-btn" disabled>Settings</button>
        <button className="game-btn back-btn" onClick={handleBackToMenu}>
          ⬅ Back to Menu
        </button>
      </div>
    </div>
  );
};

export default GameAI;
