'use strict';

var path = require('path');
var process = require('process');
var minimist = require('minimist');

function printHelp() {
  console.log([
    'usage: path-convert [path] [options]',
    '',
    'options:',
    '  --baseDir    Base path join with path.',
    '  --sep        Path separator, default is "/"(Unix*), could be "\"(Windows)',
    '  -h --help    Print usage info and exit.',
  ].join('\n'));
  process.exit(0);
}

function printError(msg, isPrintHelp) {
  console.log([
    msg,
    '',
  ].join('\n'));
  isPrintHelp && printHelp();
}

module.exports = convertPath;

function convertPath() {
  var args = minimist(process.argv.slice(2), {
    boolean: ['h', 'help'],
    string: ['path', 'baseDir', 'sep'],
  });

  if (args.h || args.help) {
    printHelp();
  }

  if (!args._ || !args._.length) {
    printError('usage error', true);
  }

  var result = path.join(args.baseDir || __dirname, args._[0]);
  var sep = args.sep || '/';
  if (process.platform === 'win32') {
    if (sep === '/') {
      result = result.replace(/(\\){1,2}/g, sep);
    }
  } else {
    if (sep === '\\') {
      result = result.replace(/\//g, '\\');
    }
  }
  console.log(result);
  return result;
}
