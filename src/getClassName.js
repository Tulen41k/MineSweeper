import {
  failMine, field, mine, notMine, size,
} from './createField';
import { MaskType } from './stubs';

function GetClassName(x, y, mask) {
  let name;
  if (mask[y * size + x] === MaskType.Transparent) {
    switch (field[y * size + x]) {
      case 0:
        name = 'zero';
        break;
      case 1:
        name = 'one';
        break;
      case 2:
        name = 'two';
        break;
      case 3:
        name = 'three';
        break;
      case 4:
        name = 'four';
        break;
      case 5:
        name = 'five';
        break;
      case 6:
        name = 'six';
        break;
      case 7:
        name = 'seven';
        break;
      case 8:
        name = 'eight';
        break;
      case mine:
        name = 'mine';
        break;
      case notMine:
        name = 'notMine';
        break;
      case failMine:
        name = 'failMine';
        break;
      default:
        break;
    }
  } else {
    switch (mask[y * size + x]) {
      case MaskType.Fill:
        name = 'fill';
        break;
      case MaskType.Flag:
        name = 'flag';
        break;
      case MaskType.Question:
        name = 'question';
        break;
      default:
        break;
    }
  }

  return name;
}

export default GetClassName;
