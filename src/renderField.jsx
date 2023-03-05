import React, { useCallback, useEffect, useState } from 'react';
import CreateField, {
  field, mine, mineCount, size,
} from './createField';
import OpenField from './openField';
import './css/renderField.css';
import CheckWinField from './checkWinField';
import GetClassName from './getClassName';
import GetCountName from './getCountName';
import { MaskType, Status } from './stubs';

function RenderField(X, Y) {
  const dimension = new Array(size).fill(null);
  const [gameStatus, setGameStatus] = useState(Status.Process);
  const [mask, setMask] = useState(() => new Array(size * size).fill(MaskType.Fill));
  const [gameStarted, setGameStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [flagMine, setMine] = useState(mineCount);
  useEffect(() => {
    if (gameStarted === false) {
      setMask(new Array(size * size).fill(MaskType.Fill));
      setTime(0);
      setMine(mineCount);
    }
    if (intervalId !== null) {
        clearInterval(intervalId);
    }
  }, [gameStarted, intervalId]);

  useEffect(() => {
    if (gameStatus === Status.Win || gameStatus === Status.Loss) {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    }
  }, [intervalId, gameStatus]);

  const handleClick = useCallback((x, y) => {
    if (gameStarted === false) {
      CreateField(x, y);
      setGameStarted(true);
      const IdInterval = setInterval(
        () => setTime((prev) => (prev + 1)),
        1000,
      );
      setIntervalId(IdInterval);
    }
    if (mask[y * size + x] === MaskType.Transparent) return;
    if (field[y * size + x] === mine) setGameStatus(Status.Loss);
    const maskNew = OpenField(x, y, mask);
    setMask(maskNew);
    if (CheckWinField(mask)) setGameStatus(Status.Win);
  }, [gameStarted, gameStatus, mask]);

  const handleRightClick = useCallback((e, x, y) => {
    e.preventDefault();
    e.stopPropagation();
    if (gameStatus === Status.Win || gameStatus === Status.Loss) return;

    switch (mask[y * size + x]) {
      case MaskType.Fill:
        mask[y * size + x] = MaskType.Flag;
        setMine((prev) => (prev - 1));
        break;
      case MaskType.Flag:
        mask[y * size + x] = MaskType.Question;
        setMine((prev) => (prev + 1));
        break;
      case MaskType.Question:
        mask[y * size + x] = MaskType.Fill;
        break;
      default:
        break;
    }

    setMask((prev) => [...prev]);
  }, [mask, gameStatus]);

  return (
        <div className='game'>
            <div className='gameHead'>
                <div className='mineCount'>
                    <div className={GetCountName(Math.floor(flagMine / 100))}></div>
                    <div className={GetCountName(Math.floor(flagMine / 10 % 10))}></div>
                    <div className={GetCountName(flagMine % 10)}></div>
                </div>
                <div className={gameStatus}
                     onMouseDown={() => {
                       setGameStatus(Status.Click);
                     }}
                     onMouseUp={() => {
                       setGameStatus(Status.Process);
                     }}
                     onClick={() => {
                       setGameStarted(false);
                       setGameStatus(Status.Process);
                     }}
                ></div>
                <div className='timer'>
                    <div className={GetCountName(Math.floor(time / 100))}></div>
                    <div className={GetCountName(Math.floor(time / 10 % 10))}></div>
                    <div className={GetCountName(time % 10)}></div>
                </div>
            </div>
            <div className='field'>
                {dimension.map((_, y) => (
                    <div key={y} className='alignY'>
                        {dimension.map((_, x) => (
                            <button key={x} className={GetClassName(x, y, mask)}
                                    disabled={gameStatus === Status.Win || gameStatus === Status.Loss}
                                    onMouseDown={() => {
                                      setGameStatus(Status.Wait);
                                    }}
                                    onMouseUp={() => (setGameStatus(Status.Process))}
                                    onClick={() => handleClick(x, y)}
                                    onContextMenu={(e) => handleRightClick(e, x, y)}
                            >
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
  );
}

export default RenderField;
