import { parse } from '@creditkarma/thrift-parser';
import chalk from 'chalk';

const main = () => {
  process.stdout.write(chalk.yellow('hello cli\n'));
  console.log(parse('struct EmptyReq {}'));
};

export default main;
