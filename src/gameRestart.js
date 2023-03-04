import {
  field, size,
} from './createField';
import { Mask, flag } from './renderField';

function GameRestart() {
  const newMask = new Array(size * size).fill(Mask.Fill);

  flag = false;
  return newMask;
}

export default GameRestart;
