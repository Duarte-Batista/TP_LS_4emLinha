import React, { useEffect } from 'react';
import './DropZone.css';
import { size, rows, cols } from '../constants/constants';
import ActiveCoin from './ActiveCoin';
import Winner from './Winner';

const DropZone = ({ scores, setScores, turn, setTurn, winner, setWinner, dropped, setDropped, reset, gameStarted, specialCells, playerNames, onDrop, gameMode }) => {
  const findWinner = () => {
    const p1 = dropped.filter(d => d.player === 1);
    p1.forEach(({ x, y }) => {
      if (p1.find(m => x === m.x + 1 && y === m.y) && p1.find(m => x === m.x + 2 && y === m.y) && p1.find(m => x === m.x + 3 && y === m.y))
        setWinner(1);
      if (p1.find(m => x === m.x && y === m.y + 1) && p1.find(m => x === m.x && y === m.y + 2) && p1.find(m => x === m.x && y === m.y + 3))
        setWinner(1);
      if (p1.find(m => x === m.x + 1 && y === m.y + 1) && p1.find(m => x === m.x + 2 && y === m.y + 2) && p1.find(m => x === m.x + 3 && y === m.y + 3))
        setWinner(1);
      if (p1.find(m => x === m.x + 1 && y === m.y - 1) && p1.find(m => x === m.x + 2 && y === m.y - 2) && p1.find(m => x === m.x + 3 && y === m.y - 3))
        setWinner(1);
    });

    const p2 = dropped.filter(d => d.player === 2);
    p2.forEach(({ x, y }) => {
      if (p2.find(m => x === m.x + 1 && y === m.y) && p2.find(m => x === m.x + 2 && y === m.y) && p2.find(m => x === m.x + 3 && y === m.y))
        setWinner(2);
      if (p2.find(m => x === m.x && y === m.y + 1) && p2.find(m => x === m.x && y === m.y + 2) && p2.find(m => x === m.x && y === m.y + 3))
        setWinner(2);
      if (p2.find(m => x === m.x + 1 && y === m.y + 1) && p2.find(m => x === m.x + 2 && y === m.y + 2) && p2.find(m => x === m.x + 3 && y === m.y + 3))
        setWinner(2);
      if (p2.find(m => x === m.x + 1 && y === m.y - 1) && p2.find(m => x === m.x + 2 && y === m.y - 2) && p2.find(m => x === m.x + 3 && y === m.y - 3))
        setWinner(2);
    });
  };

  useEffect(() => {
    if (dropped.length === rows * cols)
      setWinner(-1);
    findWinner();
  }, [dropped.length]);

  useEffect(() => {
    if (winner > 0) {
      setScores(prev => ({
        ...prev,
        [`player${winner}`]: prev[`player${winner}`] + 1
      }));
    }
  }, [winner]);

  return (
    <div className='drop-zone'>
      {gameStarted && dropped.map((m, i) =>
        <div key={i}
          className={`p${m.player}`}
          style={{ transform: `translate(${m.y * size}px, ${m.x * size + 150}px)` }}
        />
      )}
      {gameStarted && specialCells.map((cell, i) =>
        <div key={`special-${i}`}
          className="special-cell"
          style={{
            transform: `translate(${cell.y * size}px, ${cell.x * size + 150}px)`
          }}
        />
      )}
      {gameStarted && !winner && (
        <ActiveCoin
          turn={turn}
          dropped={dropped}
          setDropped={setDropped}
          setTurn={setTurn}
          specialCells={specialCells}
          onDrop={onDrop}
          gameMode={gameMode}
        />
      )}
      {gameStarted && winner !== 0 && <Winner winner={winner} reset={reset} playerNames={playerNames} />}
    </div>
  );
};

export default DropZone;