import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaRobot, 
  FaClock, 
  FaBolt, 
  FaChessBoard, 
  FaArrowLeft,
  FaStar,
  FaTrophy,
  FaGamepad
} from 'react-icons/fa';
import './GameModeSelection.css';

const GameModeSelection = ({ onBack, onSelectMode }) => {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedTimeControl, setSelectedTimeControl] = useState('10+0');

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

  const timeControls = [
    { id: '1+0', label: '1 min', type: 'Bullet', icon: FaBolt },
    { id: '3+0', label: '3 min', type: 'Blitz', icon: FaClock },
    { id: '5+0', label: '5 min', type: 'Blitz', icon: FaClock },
    { id: '10+0', label: '10 min', type: 'Rapid', icon: FaChessBoard },
    { id: '15+10', label: '15+10', type: 'Rapid', icon: FaChessBoard },
    { id: '30+0', label: '30 min', type: 'Classical', icon: FaTrophy }
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
    if (selectedMode && selectedTimeControl) {
      onSelectMode({
        mode: selectedMode,
        timeControl: selectedTimeControl
      });
    }
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
          <button className="back-button" onClick={onBack}>
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

        {/* Time Control Selection */}
        {selectedMode && (
          <motion.div 
            className="time-control-section"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
          >
            <h2>Select Time Control</h2>
            <div className="time-controls-grid">
              {timeControls.map((control) => (
                <motion.button
                  key={control.id}
                  className={`time-control-card ${selectedTimeControl === control.id ? 'selected' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTimeControl(control.id)}
                >
                  <control.icon className="time-icon" />
                  <div className="time-info">
                    <span className="time-label">{control.label}</span>
                    <span className="time-type">{control.type}</span>
                  </div>
                  {selectedTimeControl === control.id && (
                    <motion.div 
                      className="time-selected-indicator"
                      layoutId="timeSelected"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Start Game Button */}
        {selectedMode && selectedTimeControl && (
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