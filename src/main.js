import { parse } from '@creditkarma/thrift-parser';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const main = async () => {
  process.stdout.write(chalk.yellow('hello cli\n'));
  const ast = parse('struct EmptyReq {}');
  fs.promises.writeFile(path.resolve(__dirname, '..', 'output', 'ast.json'), JSON.stringify(ast, null, 2));
};

export default main;
