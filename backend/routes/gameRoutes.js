import express from 'express';

const router = express.Router();

// GET /api/game/start - Initialize a new game
router.get('/start', (req, res) => {
  try {
    const gameId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const gameState = {
      gameId: gameId,
      status: 'waiting', // waiting, in_progress, finished
      playerCount: 0,
      maxPlayers: 2,
      gameMode: req.query.mode || 'ai', // ai, multiplayer
      timeControl: req.query.timeControl || '10+0',
      board: initializeChessBoard(),
      currentTurn: 'white',
      moveHistory: [],
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };

    res.status(200).json({
      status: 'success',
      message: 'Game initialized successfully',
      data: {
        game: gameState
      }
    });
  } catch (error) {
    console.error('Error initializing game:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to initialize game'
    });
  }
});

// GET /api/game/:gameId - Get game state
router.get('/:gameId', (req, res) => {
  const { gameId } = req.params;
  
  // In a real app, this would fetch from database
  res.status(200).json({
    status: 'success',
    data: {
      gameId: gameId,
      status: 'waiting',
      message: 'Game state retrieved successfully'
    }
  });
});

// POST /api/game/:gameId/move - Make a move
router.post('/:gameId/move', (req, res) => {
  const { gameId } = req.params;
  const { from, to, piece } = req.body;
  
  // In a real app, this would validate and apply the move
  res.status(200).json({
    status: 'success',
    message: 'Move processed successfully',
    data: {
      gameId: gameId,
      move: { from, to, piece },
      timestamp: new Date().toISOString()
    }
  });
});

// Helper function to initialize chess board
function initializeChessBoard() {
  // Standard chess starting position
  return [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
  ];
}

export default router;