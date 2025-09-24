import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaRobot, 
  FaArrowLeft,
  FaStar,
  FaGamepad
} from 'react-icons/fa';
import './GameModeSelection.css';

const GameModeSelection = () => {
  const [selectedMode, setSelectedMode] = useState(null);
  const navigate = useNavigate();

  const gameModes = [
    {
      id: 'multiplayer',
      title: 'Play vs Player',
      subtitle: 'Challenge another human player',
      icon: FaUsers,
      color: '#e74c3c',
      description: 'Test your skills against real opponents from around the world',
      features: ['Ranked matches', 'Real-time play', 'Chat with opponent']
    },
    {
      id: 'ai',
      title: 'Play vs AI',
      subtitle: 'Challenge our intelligent bot',
      icon: FaRobot,
      color: '#3498db',
      description: 'Practice and improve against our advanced chess engine',
      features: ['Multiple difficulty levels', 'Instant gameplay', 'Perfect for learning']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4 }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  const handleStartGame = () => {
    if (selectedMode) {
      // Navigate to the appropriate game page based on selected mode
      if (selectedMode === 'ai') {
        navigate('/gamestartsAI');
      } else if (selectedMode === 'multiplayer') {
        navigate('/gamestartsPvP');
      }
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="game-mode-container">
      <motion.div 
        className="game-mode-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="game-mode-header" variants={cardVariants}>
          <button className="back-button" onClick={handleBackToHome}>
            <FaArrowLeft />
            <span>Back to Home</span>
          </button>
          <h1>Choose Your Game Mode</h1>
          <p>Select how you want to play and start your chess journey</p>
        </motion.div>

        {/* Game Mode Selection */}
        <motion.div className="game-modes-grid" variants={cardVariants}>
          {gameModes.map((mode) => (
            <motion.div
              key={mode.id}
              className={`game-mode-card ${selectedMode === mode.id ? 'selected' : ''}`}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => handleModeSelect(mode.id)}
            >
              <div className="mode-card-header">
                <div 
                  className="mode-icon"
                  style={{ backgroundColor: mode.color }}
                >
                  <mode.icon />
                </div>
                <div className="mode-info">
                  <h3>{mode.title}</h3>
                  <p>{mode.subtitle}</p>
                </div>
                {selectedMode === mode.id && (
                  <motion.div 
                    className="selected-indicator"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <FaStar />
                  </motion.div>
                )}
              </div>
              
              <div className="mode-description">
                <p>{mode.description}</p>
              </div>
              
              <div className="mode-features">
                {mode.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-dot"></span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Start Game Button */}
        {selectedMode && (
          <motion.div 
            className="start-game-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              className="start-game-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartGame}
            >
              <FaGamepad />
              <span>Start Game</span>
              <motion.div 
                className="button-glow"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default GameModeSelection;