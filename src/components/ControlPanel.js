import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({ scores, turn, startingPlayer, winner, reset, colors, playerNames, gameStarted, handleModeChange, gameMode, player1Time, player2Time }) => {
  const getPlayerName = (playerNumber) => {
    return playerNames[`player${playerNumber}`] || `Jogador ${playerNumber}`;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="control-panel">
      <div className="player-row">
        <div className={`player-section ${turn === 1 && gameStarted ? 'active-player' : ''}`}>
          <span className="player-name">{gameStarted ? getPlayerName(1) : 'Jogador 1'}</span>
          <div className="player-circle p1" style={{ backgroundColor: gameStarted ? colors.p1 : '#ccc' }}></div>
          <span>Tempo: {formatTime(player1Time)}</span>
          <div
            className="progress-bar p1"
            style={{ width: gameStarted ? `${(player1Time / 10) * 100}%` : '0%' }}
          ></div>
        </div>
        <div className="score-container">
          <div className="score">
            <span>{scores.player1}</span>
            <span>-</span>
            <span>{scores.player2}</span>
          </div>
        </div>
        <div className={`player-section ${turn === 2 && gameStarted ? 'active-player' : ''}`}>
          <span className="player-name">{gameStarted ? getPlayerName(2) : 'Jogador 2'}</span>
          <div className="player-circle p2" style={{ backgroundColor: gameStarted ? colors.p2 : '#ccc' }}></div>
          <span>Tempo: {formatTime(player2Time)}</span>
          <div
            className="progress-bar p2"
            style={{ width: gameStarted ? `${(player2Time / 10) * 100}%` : '0%' }}
          ></div>
        </div>
      </div>
      <div className="controls-row">
        <div className="controls-container">
          <select value={gameMode} onChange={handleModeChange}>
            <option value="" disabled>Selecione o modo de jogo</option>
            <option value="pvp">Jogador vs Jogador</option>
            <option value="cpu">Jogador vs CPU</option>
          </select>
        </div>
      </div>
      <div className="status-row">
        <span className="status-item">Quem começa? {gameStarted ? getPlayerName(startingPlayer) : '?'}</span>
        <button className="status-button" onClick={reset} disabled={!gameStarted}>Reiniciar Jogo</button>
        <span className="status-item">Vencedor: {winner === 0 ? 'Nenhum ainda' : winner === -1 ? 'Empate' : getPlayerName(winner)}</span>
      </div>
    </div>
  );
};

export default ControlPanel;