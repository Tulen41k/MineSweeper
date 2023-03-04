import { field, mine } from './createField';
import { Mask } from './renderField';

function CheckWinField(mask) {
  for (let i = 0; i < mask.length; i++) {
    const current = mask[i];
    if ((field[i] !== mine && current === Mask.Transparent)
        || (field[i] === mine && current !== Mask.Transparent)) {
      // nothing
    } else {
      return false;
    }
  }
  return true;
}

export default CheckWinField;
