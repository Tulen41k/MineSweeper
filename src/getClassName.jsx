import React from 'react';
//import ReactDOM from 'react-dom/client';
import { useState, useMemo } from 'react';
import { field, size, mine, mineMap, notMine, failMine } from './createField';
import { Mask } from './renderField';


function GetClassName ( x, y, mask ) {
    let name;
    if (mask[y * size + x] === Mask.Transparent) {
        switch (field[y * size + x]) {
            case 0:
                name = "zero";
                break;
            case 1:
                name = "one";
                break;
            case 2:
                name = "two";
                break;
            case 3:
                name = "three";
                break;
            case 4:
                name = "four";
                break;
            case 5:
                name = "five";
                break;
            case 6:
                name = "six";
                break;
            case 7:
                name = "seven";
                break;
            case 8:
                name = "eight";
                break;
            case mine:
                name = "mine";
                break;
            case notMine:
                name = "notMine";
                break;
            case failMine:
                name = "failMine";
                break;
            default:
                break;
        }

    }
    else {
        switch (mask[y * size + x]) {
            case Mask.Fill:
                name = "fill";
                break;
            case Mask.Flag:
                name = "flag";
                break;
            case Mask.Question:
                name = "question";
                break;
            default:
                break;
        }
    }
  }
  
  export default GetClassName;