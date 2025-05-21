import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { Wind, Anchor, Clock, Gauge, Award, Pause, Play, RefreshCw as Refresh } from 'lucide-react';
import { WeatherCondition, GameState } from '../types';
import RaceRecorder from '../components/RaceRecorder';

// Initial game state
const initialGameState: GameState = {
  currentPosition: {
    x: 50,
    y: 50,
  },
  speed: 0,
  direction: 0,
  weatherCondition: WeatherCondition.SUNNY,
  isRacing: false,
  raceProgress: 0,
  gamePaused: false
};

// Helper function to get a random number between min and max
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const GameScreen = () => {
  const navigate = useNavigate();
  const { selectedBoat, selectedLocation, setSelectedLocation, locations, earnUBBCC } = useGame();
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [gameTime, setGameTime] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [showLocationModal, setShowLocationModal] = useState<boolean>(!selectedLocation);
  const [earnedUBBCC, setEarnedUBBCC] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  
  // Redirect if no boat is selected
  useEffect(() => {
    if (!selectedBoat) {
      navigate('/boats');
    }
  }, [selectedBoat, navigate]);

  // Set up game canvas
  useEffect(() => {
    if (!canvasRef.current || !selectedBoat || !selectedLocation) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Draw water background
    const drawWater = () => {
      const waterColor = selectedLocation.waterConditions.waveHeight > 2 ? '#1e40af' : '#3b82f6';
      ctx.fillStyle = waterColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw waves
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      const waveHeight = selectedLocation.waterConditions.waveHeight * 5;
      const waveCount = Math.floor(canvas.height / 20);
      
      for (let i = 0; i < waveCount; i++) {
        const y = i * 20;
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width; x += 20) {
          const offset = Math.sin(x * 0.02 + (gameTime * 0.001)) * waveHeight;
          if (x === 0) {
            ctx.moveTo(x, y + offset);
          } else {
            ctx.lineTo(x, y + offset);
          }
        }
        
        ctx.stroke();
      }
    };
    
    // Draw boat
    const drawBoat = () => {
      const { x, y } = gameState.currentPosition;
      const direction = gameState.direction;
      
      // Calculate position on canvas
      const posX = (x / 100) * canvas.width;
      const posY = (y / 100) * canvas.height;
      
      ctx.save();
      ctx.translate(posX, posY);
      ctx.rotate(direction * Math.PI / 180);
      
      // Draw boat based on class
      if (selectedBoat.class === 'Sailing Craft') {
        // Sailing boat
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.moveTo(0, -15);
        ctx.lineTo(10, 15);
        ctx.lineTo(-10, 15);
        ctx.closePath();
        ctx.fill();
        
        // Sail
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(0, -15);
        ctx.lineTo(0, 0);
        ctx.lineTo(15, 0);
        ctx.closePath();
        ctx.fill();
      } else if (selectedBoat.class === 'Motor Craft') {
        // Motor boat
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(-15, -8, 30, 16);
        
        ctx.fillStyle = '#334155';
        ctx.fillRect(-10, -12, 15, 5);
      } else {
        // Canoe
        ctx.fillStyle = '#fef3c7';
        ctx.beginPath();
        ctx.ellipse(0, 0, 15, 5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    };
    
    // Draw race track if racing
    const drawRaceTrack = () => {
      if (!gameState.isRacing) return;
      
      const startX = 50;
      const startY = canvas.height - 30;
      const endX = canvas.width - 50;
      const endY = 30;
      
      // Start line
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(startX - 10, startY);
      ctx.lineTo(startX + 10, startY);
      ctx.stroke();
      
      // Finish line
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(endX - 10, endY);
      ctx.lineTo(endX + 10, endY);
      ctx.stroke();
      
      // Track path
      ctx.strokeStyle = '#a1a1aa';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(
        startX + 100, startY - 50,
        endX - 100, endY + 50,
        endX, endY
      );
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Progress indicator
      if (gameState.raceProgress > 0) {
        const progress = gameState.raceProgress / 100;
        const t = progress;
        const posX = (1 - t) * (1 - t) * (1 - t) * startX + 3 * (1 - t) * (1 - t) * t * (startX + 100) + 
                    3 * (1 - t) * t * t * (endX - 100) + t * t * t * endX;
        const posY = (1 - t) * (1 - t) * (1 - t) * startY + 3 * (1 - t) * (1 - t) * t * (startY - 50) + 
                    3 * (1 - t) * t * t * (endY + 50) + t * t * t * endY;
        
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(posX, posY, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    
    // Draw weather effects
    const drawWeather = () => {
      if (gameState.weatherCondition === WeatherCondition.RAINY) {
        // Draw rain drops
        ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * canvas.width;
          const y = (Math.random() * canvas.height + gameTime * 0.2) % canvas.height;
          ctx.fillRect(x, y, 1, 5);
        }
      } else if (gameState.weatherCondition === WeatherCondition.STORMY) {
        // Draw stronger rain and lightning
        ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
        for (let i = 0; i < 200; i++) {
          const x = Math.random() * canvas.width;
          const y = (Math.random() * canvas.height + gameTime * 0.5) % canvas.height;
          ctx.fillRect(x, y, 2, 8);
        }
        
        // Occasional lightning flash
        if (Math.random() < 0.01) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      } else if (gameState.weatherCondition === WeatherCondition.CLOUDY) {
        // Draw clouds
        ctx.fillStyle = 'rgba(203, 213, 225, 0.3)';
        const cloudCount = 5;
        for (let i = 0; i < cloudCount; i++) {
          const x = ((i * canvas.width / cloudCount) + gameTime * 0.02) % canvas.width;
          const y = 30 + i * 20;
          drawCloud(ctx, x, y, 30);
        }
      }
    };
    
    // Helper to draw a cloud
    const drawCloud = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.arc(x + size * 0.5, y - size * 0.4, size * 0.6, 0, Math.PI * 2);
      ctx.arc(x + size, y, size * 0.8, 0, Math.PI * 2);
      ctx.fill();
    };
    
    // Render game frame
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawWater();
      drawWeather();
      drawRaceTrack();
      drawBoat();
    };
    
    render();
    
    // Set up game loop when not paused
    if (!gameState.gamePaused) {
      gameLoopRef.current = window.setInterval(() => {
        if (gameState.isRacing) {
          // Update race progress
          const boatSpeed = selectedBoat.speed / 10; // 0.4 - 1.5
          const locationModifier = selectedLocation.waterConditions.currentStrength / 5; // 0.3 - 0.7
          const weatherModifier = gameState.weatherCondition === WeatherCondition.STORMY ? 0.7 : 
                                 gameState.weatherCondition === WeatherCondition.RAINY ? 0.85 : 1;
          
          const progressIncrement = boatSpeed * (1 - locationModifier) * weatherModifier * 0.5;
          
          setGameState(prev => ({
            ...prev,
            raceProgress: Math.min(prev.raceProgress + progressIncrement, 100)
          }));
          
          // Check if race finished
          if (gameState.raceProgress >= 100) {
            // Calculate reward based on boat, location difficulty and weather
            const baseReward = 100;
            const difficultyBonus = selectedLocation.difficulty * 20;
            const weatherBonus = gameState.weatherCondition === WeatherCondition.STORMY ? 100 :
                                gameState.weatherCondition === WeatherCondition.RAINY ? 50 : 0;
            
            const reward = Math.floor(baseReward + difficultyBonus + weatherBonus);
            
            // Update game state and award UBBCC
            setGameState(prev => ({
              ...prev,
              isRacing: false,
              raceProgress: 100,
              gamePaused: true
            }));
            
            setEarnedUBBCC(reward);
            earnUBBCC(reward);
          }
        }
        
        // Update game time
        setGameTime(prev => prev + 16);
        
        // Randomly change weather (very small chance)
        if (Math.random() < 0.0005) {
          const conditions = Object.values(WeatherCondition);
          const newWeather = conditions[Math.floor(Math.random() * conditions.length)];
          
          setGameState(prev => ({
            ...prev,
            weatherCondition: newWeather
          }));
        }
        
        // Update boat position with slight movement for realism
        setGameState(prev => ({
          ...prev,
          currentPosition: {
            x: prev.currentPosition.x + (Math.random() - 0.5) * 0.2,
            y: prev.currentPosition.y + (Math.random() - 0.5) * 0.2
          }
        }));
        
        render();
      }, 16);
    }
    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [selectedBoat, selectedLocation, gameState, gameTime]);
  
  // Handle key controls
  useEffect(() => {
    if (!selectedBoat || gameState.gamePaused) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w') {
        // Increase speed
        setGameState(prev => ({
          ...prev,
          speed: Math.min(prev.speed + 0.5, selectedBoat.speed / 2)
        }));
      } else if (e.key === 'ArrowDown' || e.key === 's') {
        // Decrease speed
        setGameState(prev => ({
          ...prev,
          speed: Math.max(prev.speed - 0.5, 0)
        }));
      } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        // Turn left
        setGameState(prev => ({
          ...prev,
          direction: (prev.direction - 5) % 360
        }));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        // Turn right
        setGameState(prev => ({
          ...prev,
          direction: (prev.direction + 5) % 360
        }));
      } else if (e.key === ' ') {
        // Space to toggle pause
        setGameState(prev => ({
          ...prev,
          gamePaused: !prev.gamePaused
        }));
      } else if (e.key === 'r') {
        // R to start/restart race
        if (!gameState.isRacing) {
          setGameState(prev => ({
            ...prev,
            isRacing: true,
            raceProgress: 0
          }));
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedBoat, gameState.gamePaused]);
  
  // Handle location selection
  const handleLocationSelect = (locationId: string) => {
    const location = locations.find(loc => loc.id === locationId);
    if (location) {
      setSelectedLocation(location);
      setShowLocationModal(false);
      
      // Reset game state when changing location
      setGameState(initialGameState);
      setGameTime(0);
    }
  };
  
  // Start or restart a race
  const handleStartRace = () => {
    setGameState(prev => ({
      ...prev,
      isRacing: true,
      raceProgress: 0,
      gamePaused: false
    }));
    
    setEarnedUBBCC(null);
  };
  
  // Toggle game pause
  const handleTogglePause = () => {
    setGameState(prev => ({
      ...prev,
      gamePaused: !prev.gamePaused
    }));
  };
  
  // Format time display
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!selectedBoat) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="relative w-full h-[calc(100vh-8rem)]">
        {/* Game Canvas */}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full bg-blue-400"
        />
        
        {/* Race Recorder */}
        <RaceRecorder 
          isRacing={gameState.isRacing} 
          canvasRef={canvasRef}
        />
        
        {/* HUD Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
          <div className="bg-blue-900/80 text-white p-3 rounded-lg">
            <div className="flex items-center mb-2">
              <Ship className="h-5 w-5 mr-2" />
              <span className="font-bold">{selectedBoat.name}</span>
              <span className="text-blue-300 text-sm ml-2">({selectedBoat.class})</span>
            </div>
            
            <div className="flex items-center text-sm">
              <Gauge className="h-4 w-4 mr-1 text-blue-300" />
              <span>Speed: {gameState.speed.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="bg-blue-900/80 text-white p-3 rounded-lg">
            <div className="flex items-center mb-2">
              <Anchor className="h-5 w-5 mr-2" />
              <span className="font-bold">{selectedLocation?.name || 'Select Location'}</span>
            </div>
            
            <div className="flex items-center text-sm">
              <Wind className="h-4 w-4 mr-1 text-blue-300" />
              <span>Weather: {gameState.weatherCondition}</span>
            </div>
          </div>
        </div>
        
        {/* Race Progress */}
        {gameState.isRacing && (
          <div className="absolute top-20 left-4 right-4 bg-white/80 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Race Progress</span>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatTime(gameTime)}</span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${gameState.raceProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Game Controls */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="flex justify-between">
            <button
              onClick={() => setShowControls(!showControls)}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showControls ? 'Hide Controls' : 'Show Controls'}
            </button>
            
            <div className="flex space-x-3">
              <button
                onClick={handleTogglePause}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {gameState.gamePaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
              </button>
              
              <button
                onClick={() => setShowLocationModal(true)}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Change Location
              </button>
              
              {!gameState.isRacing && (
                <button
                  onClick={handleStartRace}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <Award className="h-5 w-5 mr-2" />
                  Start Race
                </button>
              )}
            </div>
          </div>
          
          {showControls && (
            <div className="mt-4 bg-white/90 p-4 rounded-lg">
              <h3 className="font-bold mb-3">Game Controls</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Movement</p>
                  <ul className="text-sm text-gray-700">
                    <li>↑ or W - Increase speed</li>
                    <li>↓ or S - Decrease speed</li>
                    <li>← or A - Turn left</li>
                    <li>→ or D - Turn right</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">Game Controls</p>
                  <ul className="text-sm text-gray-700">
                    <li>Space - Pause/Resume game</li>
                    <li>R - Start/Restart race</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Location Selection Modal */}
        {showLocationModal && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Select Sailing Location</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {locations.map(location => (
                  <div 
                    key={location.id}
                    className={`border rounded-lg overflow-hidden ${!location.unlocked && 'opacity-50'}`}
                  >
                    <img 
                      src={location.imageUrl} 
                      alt={location.name} 
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-medium mb-1">{location.name}</h3>
                      <div className="flex mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Award 
                            key={i}
                            className={`h-4 w-4 ${i < location.difficulty ? 'text-blue-600' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => handleLocationSelect(location.id)}
                        className={`w-full py-1.5 rounded text-sm font-medium ${
                          location.unlocked 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!location.unlocked}
                      >
                        {location.unlocked ? 'Select' : 'Locked'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedLocation && (
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowLocationModal(false)}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-800"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Race Reward Modal */}
        {earnedUBBCC !== null && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
              <h2 className="text-2xl font-bold mb-2 text-blue-900">Race Complete!</h2>
              <p className="text-gray-600 mb-6">You've successfully completed the race at {selectedLocation?.name}.</p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-lg mb-2">You earned:</p>
                <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-blue-700">
                  <Anchor className="h-6 w-6" />
                  <span>{earnedUBBCC} UBBCC</span>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleStartRace}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Refresh className="h-5 w-5 mr-2" />
                  Race Again
                </button>
                <button
                  onClick={() => {
                    setEarnedUBBCC(null);
                    setGameState(prev => ({
                      ...prev,
                      gamePaused: false
                    }));
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Continue Sailing
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;