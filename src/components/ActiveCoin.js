import React, { useEffect, useState } from 'react';
import { size, cols, rows } from '../constants/constants';

const ActiveCoin = ({ turn, dropped, setDropped, setTurn, specialCells, onDrop, gameMode }) => {
  const [column, setColumn] = useState(3);

  const getRandomValidColumn = () => {
    const validColumns = [];
    for (let col = 0; col < cols; col++) {
      if (!dropped.find(drop => drop.x === 0 && drop.y === col)) {
        validColumns.push(col);
      }
    }
    return validColumns.length > 0 ? validColumns[Math.floor(Math.random() * validColumns.length)] : null;
  };

  const dropCoin = (col) => {
    if (dropped.find(drop => drop.x === 0 && drop.y === col)) {
      return;
    }

    const len = rows - 1 - dropped.filter(drop => drop.y === col).length;
    const newDrop = { x: len, y: col, player: turn };
    setDropped(prev => [...prev, newDrop]);

    const isSpecial = specialCells.some(cell => cell.x === len && cell.y === col);

    if (!isSpecial) {
      setTurn(turn === 1 ? 2 : 1);
    }
    onDrop();
  };

  const handleKeyDown = e => {
    if (e.keyCode === 37 && column > 0) {
      setColumn(column - 1);
    } else if (e.keyCode === 39 && column < cols - 1) {
      setColumn(column + 1);
    } else if (e.keyCode === 32 || e.keyCode === 13) {
      dropCoin(column);
    }
  };

  useEffect(() => {
    if (gameMode === 'cpu' && turn === 2) {
      const moveTimeout = setTimeout(() => {
        const randomCol = getRandomValidColumn();
        if (randomCol !== null) {
          setColumn(randomCol); // Move coin to the chosen column
          const dropTimeout = setTimeout(() => {
            dropCoin(randomCol); // Drop the coin after moving
          }, 500); // Wait 500ms after moving to drop
          return () => clearTimeout(dropTimeout);
        }
      }, 500); // Wait 500ms before moving to column
      return () => clearTimeout(moveTimeout);
    }
  }, [turn, gameMode, dropped]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    setColumn(3);
  }, [dropped.length]);

  return (
    <div
      className={`active p${turn}`}
      style={{ transform: `translate(${column * size}px, 0)` }}
    />
  );
};

export default ActiveCoin;