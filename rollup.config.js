import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default [{
  input: './index.js',
  output: [{
    banner: '#!/usr/bin/env node',
    file: 'bin/index.js',
    format: 'cjs'
  }],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    json({
      preferConst: true,
      indent: '  '
    })
  ],
  external: [
    'fs',
    'path',
    'commander',
    'mkdirp',
    'chalk',
    'ora',
    'promise-jsonfile',
    'shelljs',
    '@creditkarma/thrift-parser',
    'ejs',
    'camelcase'
  ]
}];
