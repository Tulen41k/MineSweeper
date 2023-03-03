import React from 'react';
//import ReactDOM from 'react-dom/client';
import { useState, useMemo } from 'react';
import { field, size, mine, mineMap } from './createField';
import { Mask } from './renderField';


function CheckWinField( mask ) {
    let state = mask.reduce(function(state, current, i, mask){
        if ((field[i] != mine && current === Mask.Transparent) || 
            (field[i] === mine && (current === Mask.Fill || current === Mask.Flag || current === Mask.Question )))
            return true;
        else 
            return false;
    }, true)
    
    console.log(state);
    return state;
  }
  
  export default CheckWinField;