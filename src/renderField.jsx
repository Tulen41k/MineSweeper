import React from 'react';
//import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import CreateField, { field, size, mine } from './createField';
import OpenField from './openField';
import './css/renderField.css'
import CheckWinField from './checkWinField';
import GetClassName from './getClassName';

var flag = false;

export let Mask = {
    Transparent: "",
    Fill: "",
    Flag: "",
    Question: "",
}

export let Status = {
    Process: "PROGRESS",
    Win: "WIN",
    Loss: "LOSS",
}

function RenderField(X, Y) {
    const dimension = new Array(size).fill(null);
    const [gameStatus, setGameStatus] = useState (Status.Process);
    const [mask, setMask] = useState (() => new Array (size * size).fill(Mask.Fill));

    return (
        <div className='field'>
            {dimension.map((_,y) => {
                return (
                    <div key={y} className='alignY'>
                        {dimension.map((_,x) => {
                            return (
                                <button key={x} className={GetClassName(x, y, mask)} 
                                onClick={() => {
                                    console.log(GetClassName(x, y, mask));
                                    console.log(field);
                                    if (flag === false) { 
                                        CreateField(x, y);
                                        flag = true;
                                    }
                                    if (mask[y * size + x] === Mask.Transparent) return;
                                    if (field[y * size + x] === mine) setGameStatus(Status.Loss);
                                    let maskNew = OpenField(x, y, mask);
                                    setMask(maskNew);
                                    if (CheckWinField(mask)) setGameStatus(Status.Win);
                                    console.log(flag);
                                    console.log(field);
                                }}
                                onContextMenu={(e => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    switch (mask[y * size + x]) {
                                        case Mask.Fill:
                                            mask[y * size + x] = Mask.Flag;
                                            break;
                                        case Mask.Flag:
                                            mask[y * size + x] = Mask.Question;
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
                            );
                        })}
                    </div>
                );
            })}
            {gameStatus}
        </div>
    );
}

export default RenderField;