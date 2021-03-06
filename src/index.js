import fs from 'fs';
import path from 'path';
import { RawSource } from 'webpack-sources';

import cssPrefixer from './css-prefixer';


const defaultFileSuffix = '-prefixed';

let filePatterns;
let fileSuffix;
let cssPrefix;
let shouldPrefixElements;

function PrefixCssPlugin(options) {
  filePatterns = options.filePatterns;
  cssPrefix = options.cssPrefix;
  shouldPrefixElements = options.prefixElements ? options.prefixElements : false;
  fileSuffix = options.fileSuffix ? options.fileSuffix : defaultFileSuffix;
}

PrefixCssPlugin.prototype.apply = function(compiler) {

  compiler.plugin('emit', (compilation, callback) => {
    let prefixedCssContent = '';
    for (const filename in compilation.assets) {
      for (const pattern in filePatterns) {
        if (filePatterns[pattern].test(filename)) {
          let content = compilation.assets[filename].source();
          prefixedCssContent = cssPrefixer(
            content,
            cssPrefix, 
            shouldPrefixElements
          );

          compilation.assets[generateFileName(filename)] = {
            source: () => prefixedCssContent,
            size: () => prefixedCssContent.length
          };
        }
      }
    }

    callback();
  });
};

function generateFileName(filename) {
  let fileNameParts = filename.split('.');
  return `${fileNameParts[0]}${fileSuffix}.${fileNameParts[1]}`;
}

module.exports = PrefixCssPlugin;