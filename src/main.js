import { parse } from '@creditkarma/thrift-parser';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const INPUT_FILE = path.resolve(__dirname, '..', 'input', 'demo.thrift');
const OUTPUT_DEST = path.resolve(__dirname, '..', 'output');

const main = async () => {
  process.stdout.write(chalk.yellow('hello cli\n'));

  const thriftCode = (await fs.promises.readFile(INPUT_FILE)).toString();
  const thriftAst = parse(thriftCode);

  fs.promises.writeFile(path.resolve(OUTPUT_DEST, 'ast.json'), JSON.stringify(thriftAst, null, 2));
};

export default main;
