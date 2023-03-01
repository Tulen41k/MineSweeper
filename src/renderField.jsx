import React from 'react';
//import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import CreateField, { field, size } from './createField';
import OpenField from './openField';
import './css/renderField.css'

export let Mask = {
    Transparent: "",
    Fill: "L",
    Flag: "F",
    Question: "Q",
}

function RenderField(X, Y) {
    const dimension = new Array(size).fill(null);

    const [field, setField] = useState (() => CreateField(size));
    const [mask, setMask] = useState (() => new Array (size * size).fill(Mask.Fill));

    return (
        <div className='field'>
            {dimension.map((_,y) => {
                return (
                    <div key={y} className='alignY'>
                        {dimension.map((_,x) => {
                            return (
                                <div key={x} className='alignX'
                                onClick={() => {
                                    if (mask[y * size + x] === Mask.Transparent) return;
                                    OpenField(x, y, mask);
                                    setMask((prev) => [...prev]);
                                }}
                                >
                                    { mask[y * size + x] !== Mask.Transparent ? mask[y * size + x]
                                    : field[y * size + x]
                                    }
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default RenderField;