import React from 'react';
import ReactDOM from 'react-dom/client';
import { field, size, mine } from './createField';
import { Mask, mask } from './renderField';

function clear (x, y) {
    if (x >= 0 && x < size && y >=0 && y < size) {
        if (mask[y * size * x] = Mask.Transparent) return;
        clearing.push([x, y]);
    }
}

function rise (x, y) {
    clear (x + 1, y);
    clear (x - 1, y);
    clear (x, y + 1);
    clear (x, y - 1);
}


const clearing = [-1][-1];

function OpenField(x, y) { 
    clear (x, y);
    while (clearing.length) {
        const [x, y] = clearing.pop();
        mask[y * size * x] = Mask.Transparent;

        if (field[y * size * x] !== 0) continue;
        rise(x, y);
    }
}

export default OpenField;