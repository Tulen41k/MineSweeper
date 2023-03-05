import { field, mine } from './createField';
import { MaskType } from './stubs';

function CheckWinField(mask) {
  for (let i = 0; i < mask.length; i++) {
    const current = mask[i];
    if ((field[i] !== mine && current === MaskType.Transparent)
            || (field[i] === mine && current !== MaskType.Transparent)) {
      // nothing
    } else {
      return false;
    }
  }
  return true;
}

export default CheckWinField;
