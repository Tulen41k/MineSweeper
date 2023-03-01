import React from 'react';
import ReactDOM from 'react-dom/client';

export const mine = -1;
export const mineCount = 40;
export const size = 16;
export const field = new Array(size*size).fill(0);

function CreateField( notMineX, notMineY) {

    function rise (x, y) {
        inc (x + 1, y);
        inc (x - 1, y);
        inc (x, y + 1);
        inc (x, y - 1);
        inc (x + 1, y + 1);
        inc (x + 1, y - 1);
        inc (x - 1, y - 1);
        inc (x - 1, y +1);

    }

    function inc (x, y) {
        if (x >=0 && x < size && y >= 0 && y < size && field[y * size + x] != mine) {
            field[y * size + x] += 1;
        } 

    }

    for (let i = 0; i < mineCount;) {
        const x = Math.floor(Math.random()*size);
        const y = Math.floor(Math.random()*size);

        if ((field [y * size + x]) === mine) continue;
        if (x == notMineX && y == notMineY) continue;

        field[y * size + x] = mine;

        i+=1;

        rise (x, y);
    }

    return field;
  }
  
  export default CreateField;
  