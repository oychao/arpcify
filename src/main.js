/* eslint-disable no-unused-vars */
/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */

import { parse } from '@creditkarma/thrift-parser';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const INPUT_FILE = path.resolve(__dirname, '..', 'input', 'demo.thrift');
const OUTPUT_DEST = path.resolve(__dirname, '..', 'output');

/**
* handle nodes with specific selector path, n (n >= 2) dimension array not supported
* @param {ASTNode} astNode
* @param {string} selector
* @param {Function} cb
* @param {Array<ASTNode>} path
*/
async function select(astNode, selector = [], cb = () => { }, astVisitingPath = [astNode]) {
  if (!astNode) {
    return;
  }
  const values = [];
  Object.keys(astNode).forEach((key) => {
    const value = astNode[key];
    if (Array.isArray(value)) {
      values.push(...value);
    } else {
      values.push(value);
    }
  });

  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    if (Object.prototype.toString.call(value) === '[object Object]') {
      delete value.loc;
      if (value.type) {
        astVisitingPath.push(value);
      } else {
        continue;
      }
      const selectorCopy = [...selector];
      const pathCopy = [...astVisitingPath];
      let curSelectorStr = selectorCopy.pop();
      let curPathEle = pathCopy.pop();
      if (curPathEle && curSelectorStr === curPathEle.type) {
        while (curSelectorStr && curPathEle) {
          if (curSelectorStr === curPathEle.type) {
            curSelectorStr = selectorCopy.pop();
            if (!curSelectorStr) {
              await cb(value, astVisitingPath);
              break;
            }
          }
          curPathEle = pathCopy.pop();
        }
      }
      await select(value, selector, cb, astVisitingPath);
      astVisitingPath.pop();
    }
  }
}

const main = async () => {
  process.stdout.write(chalk.yellow('hello cli\n'));

  const thriftCode = (await fs.promises.readFile(INPUT_FILE)).toString();
  const thriftAst = parse(thriftCode);

  fs.promises.writeFile(path.resolve(OUTPUT_DEST, 'ast.json'), JSON.stringify(thriftAst, null, 2));
};

export default main;
