import axios from 'axios';
import add from "./lib/add.js";
import { min as mini } from "./lib/min.js";
import age, { ageA } from "./lib/age.js";
import * as all from "./lib/all.js";

import './style/index.less';

function methodA(name) {
  return 12;
}

const methodB = (age) => {
  return age > 1 ? 1 : 2;
};

export default varA = 1;
export const varB = 2;
export { methodA };
export { methodB as methodC };
