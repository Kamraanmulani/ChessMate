import React, { useState } from 'react'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'
import GameModeSelection from './components/GameMode/GameModeSelection'

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [gameConfig, setGameConfig] = useState(null);

  const handleStartPlaying = () => {
    setCurrentPage('gameMode');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleGameModeSelect = (config) => {
    setGameConfig(config);
    // In a real app, this would navigate to the actual game page
    console.log('Starting game with config:', config);
    alert(`Starting ${config.mode} game with ${config.timeControl} time control!`);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'gameMode':
        return (
          <GameModeSelection 
            onBack={handleBackToHome}
            onSelectMode={handleGameModeSelect}
          />
        );
      case 'home':
      default:
        return (
          <>
            <Header />
            <Hero onStartPlaying={handleStartPlaying} />
            <Features />
            <HowItWorks />
            <Footer />
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="App">
        {renderPage()}
      </div>
    </AuthProvider>
  )
}

export default App
