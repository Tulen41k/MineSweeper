import React, { useState } from 'react';
import CreateField, {
  field, size, mine, mineCount,
} from './createField';
import OpenField from './openField';
import './css/renderField.css';
import CheckWinField from './checkWinField';
import GetClassName from './getClassName';
import GameRestart from './gameRestart';
import GetCountName from './getCountName';

export let flag = false;
export let flagMine = mineCount;
const time = 0;

export const Mask = {
  Transparent: '',
  Fill: 'L',
  Flag: 'F',
  Question: 'Q',
};

export const Status = {
  Process: 'progress',
  Win: 'win',
  Loss: 'loss',
  Wait: 'wait',
  Click: 'click',
};

function RenderField(X, Y) {
  const dimension = new Array(size).fill(null);
  const [gameStatus, setGameStatus] = useState(Status.Process);
  const [mask, setMask] = useState(() => new Array(size * size).fill(Mask.Fill));

  return (
        <div className='game'>
            <div className='gameHead'>
                <div className='mineCount'>
                    <div className={GetCountName(Math.floor(flagMine / 100))}></div>
                    <div className={GetCountName(Math.floor(flagMine / 10 % 10))}></div>
                    <div className={GetCountName(flagMine % 10)}></div>
                </div>
                <div className={gameStatus}
                onMouseDown={() => { setGameStatus(Status.Click); }}
                onMouseUp={() => { setGameStatus(Status.Process); }}
                onClick={() => {
                  setMask(GameRestart);
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
                                    onMouseDown = {() => { setGameStatus(Status.Wait); }}
                                    onMouseUp = {() => (setGameStatus(Status.Process))}
                                    onClick={() => {
                                      if (flag === false) {
                                        CreateField(x, y);
                                        flag = true;
                                      }
                                      if (mask[y * size + x] === Mask.Transparent || gameStatus === Status.Loss) return;
                                      if (field[y * size + x] === mine) setGameStatus(Status.Loss);
                                      const maskNew = OpenField(x, y, mask);
                                      setMask(maskNew);
                                      if (CheckWinField(mask)) setGameStatus(Status.Win);
                                    }}
                                    onContextMenu={((e) => {
                                      e.preventDefault();
                                      e.stopPropagation();

                                      switch (mask[y * size + x]) {
                                        case Mask.Fill:
                                          mask[y * size + x] = Mask.Flag;
                                          flagMine -= 1;
                                          break;
                                        case Mask.Flag:
                                          mask[y * size + x] = Mask.Question;
                                          flagMine += 1;
                                          break;
                                        case Mask.Question:
                                          mask[y * size + x] = Mask.Fill;
                                          break;
                                        default:
                                          break;
                                      }

                                      setMask((prev) => [...prev]);
                                    })}
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
