import {
  failMine, field, mine, mineMap, notMine, size,
} from './createField';
import { MaskType } from './stubs';

const clearing = [[]];

function clear(x, y, newMask) {
  if (x >= 0 && x < size && y >= 0 && y < size) {
    if (newMask[y * size + x] === MaskType.Transparent) return newMask;
    clearing.push([x, y]);
  }

  return newMask;
}

function rise(x, y, newMask) {
  newMask = clear(x + 1, y, newMask);
  newMask = clear(x - 1, y, newMask);
  newMask = clear(x, y + 1, newMask);
  newMask = clear(x, y - 1, newMask);
  return newMask;
}

function checkFlag(newMask) {
  for (let i = 0; i < newMask.length; i++) {
    if ((newMask[i] === MaskType.Flag || newMask[i] === MaskType.Question) && field[i] !== mine) {
      newMask[i] = MaskType.Transparent;
      field[i] = notMine;
    }
  }

  return newMask;
}

function loss(newMask) {
  while (mineMap.length) {
    const [x, y] = mineMap.pop();
    newMask[y * size + x] = MaskType.Transparent;
  }

  newMask = checkFlag(newMask);

  return newMask;
}

function OpenField(x, y, mask) {
  let newMask = mask.slice();

  if (field[y * size + x] === mine) {
    field[y * size + x] = failMine;
    newMask = loss(newMask);
  } else {
    newMask = clear(x, y, newMask);

    while (clearing.length) {
      const [x, y] = clearing.pop();
      newMask[y * size + x] = MaskType.Transparent;

      if (field[y * size + x] !== 0) continue;
      newMask = rise(x, y, newMask);
    }
  }

  return newMask;
}

export default OpenField;
