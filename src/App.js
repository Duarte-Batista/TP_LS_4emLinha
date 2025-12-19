import React, { useState, useEffect } from 'react';
import { rows, cols } from './constants/constants';
import './App.css';
import Board from './components/Board';
import DropZone from './components/DropZone';
import ControlPanel from './components/ControlPanel';

function App() {
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [turn, setTurn] = useState();
  const [startingPlayer, setStartingPlayer] = useState();
  const [winner, setWinner] = useState(0);
  const [dropped, setDropped] = useState([]);
  const [colors, setColors] = useState({ p1: null, p2: null });
  const [gameMode, setGameMode] = useState('');
  const [playerNames, setPlayerNames] = useState({ player1: '', player2: '' });
  const [gameStarted, setGameStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [specialCells, setSpecialCells] = useState([]);
  const [player1Time, setPlayer1Time] = useState(0);
  const [player2Time, setPlayer2Time] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  const generateSpecialCells = () => {
    const specials = [];
    while (specials.length < 5) {
      const randomX = Math.floor(Math.random() * rows);
      const randomY = Math.floor(Math.random() * cols);
      if (!specials.some(cell => cell.x === randomX && cell.y === randomY)) {
        specials.push({ x: randomX, y: randomY });
      }
    }
    setSpecialCells(specials);
  };

  useEffect(() => {
    generateSpecialCells();
  }, []);

  useEffect(() => {
    let timerInterval;
    if (gameStarted && !winner && timerStarted) {
      timerInterval = setInterval(() => {
        if (turn === 1) {
          setPlayer1Time((prev) => {
            if (prev >= 10) {
              setTurn(2);
              return 0;
            }
            return prev + 1;
          });
        } else {
          setPlayer2Time((prev) => {
            if (prev >= 10) {
              setTurn(1);
              return 0;
            }
            return prev + 1;
          });
        }
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [gameStarted, winner, turn, timerStarted]);

  const handleModeChange = (e) => {
    setGameMode(e.target.value);
    setShowModal(true);
    setGameStarted(false);
    setScores({ player1: 0, player2: 0 });
    setPlayerNames({player1: '', player2: ''});
    setTimerStarted(false);
    reset();
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (playerNames.player1) {
      const updatedNames = {
        player1: playerNames.player1,
        player2: gameMode === 'cpu' ? 'CPU' : playerNames.player2
      };
      setPlayerNames(updatedNames);
      const newStartingPlayer = Math.floor(Math.random() * 2) + 1;
      setTurn(newStartingPlayer);
      setStartingPlayer(newStartingPlayer);
      setColors({
        p1: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
        p2: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
      });
      setGameStarted(true);
      setShowModal(false);
      setTimerStarted(true);
    }
  };

  const reset = () => {
    const newStartingPlayer = Math.floor(Math.random() * 2) + 1;
    setTurn(newStartingPlayer);
    setStartingPlayer(newStartingPlayer);
    setDropped([]);
    setWinner(0);
    setColors({
      p1: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
      p2: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    });
    generateSpecialCells();
    setPlayer1Time(0);
    setPlayer2Time(0);
    setTimerStarted(true);
  };

  const handleDrop = () => {
    setPlayer1Time(0);
    setPlayer2Time(0);
    setTimerStarted(true);
  };

  return (
    <div className="App" style={{ '--p1': colors.p1, '--p2': colors.p2 }}>
      <div className={`game-wrapper ${showModal ? 'blurred' : ''}`}>
        <div className="game-box">
          <div className="header-text">
            <span>JOGO 4 EM LINHA</span>
            <span>Trabalho Prático Linguagens Script 2024/2025</span>
          </div>
          <ControlPanel
            scores={scores}
            turn={turn}
            startingPlayer={startingPlayer}
            winner={winner}
            reset={reset}
            colors={colors}
            playerNames={playerNames}
            gameStarted={gameStarted}
            handleModeChange={handleModeChange}
            gameMode={gameMode}
            player1Time={player1Time}
            player2Time={player2Time}
          />
          <div className="game-container">
            <DropZone
              scores={scores}
              setScores={setScores}
              turn={turn}
              setTurn={setTurn}
              winner={winner}
              setWinner={setWinner}
              dropped={dropped}
              setDropped={setDropped}
              reset={reset}
              gameStarted={gameStarted}
              playerNames={playerNames}
              specialCells={specialCells}
              onDrop={handleDrop}
              gameMode={gameMode}
            />
            <Board />
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Inserir Nomes dos Jogadores</h2>
            <form onSubmit={handleNameSubmit}>
              <input
                type="text"
                placeholder="Nome do Jogador 1"
                value={playerNames.player1}
                onChange={(e) => setPlayerNames({ ...playerNames, player1: e.target.value })}
                required
              />
              {gameMode === 'pvp' && (
                <input
                  type="text"
                  placeholder="Nome do Jogador 2"
                  value={playerNames.player2}
                  onChange={(e) => setPlayerNames({ ...playerNames, player2: e.target.value })}
                  required
                />
              )}
              {gameMode === 'cpu' && (
                <input
                  type="text"
                  placeholder="Nome do Jogador 2"
                  value="CPU"
                  disabled
                />
              )}
              <button type="submit">Confirmar</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;