import React from 'react';
//import ReactDOM from 'react-dom/client';
import { useState, useMemo } from 'react';
import { field, size, mine, mineMap, notMine, failMine } from './createField';
import { Mask, flag } from './renderField';

function GameRestart() {
    let newMask = new Array (size * size).fill(Mask.Fill);
    
    flag = false;
    return newMask;
  }
  
  export default GameRestart;