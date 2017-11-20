'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpackSources = require('webpack-sources');

var _cssPrefixer = require('./css-prefixer');

var _cssPrefixer2 = _interopRequireDefault(_cssPrefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultFileSuffix = '-prefixed';

var filePatterns = void 0;
var fileSuffix = void 0;
var cssPrefix = void 0;
var shouldPrefixElements = void 0;

// https://survivejs.com/webpack/extending/plugins/
// https://github.com/webpack/docs/wiki/plugins
function PrefixCssPlugin(options) {
  filePatterns = options.filePatterns;
  cssPrefix = options.cssPrefix;
  console.log(options.shouldPrefixElements);
  shouldPrefixElements = options.shouldPrefixElements ? options.shouldPrefixElements : false;
  fileSuffix = options.fileSuffix ? options.fileSuffix : defaultFileSuffix;
}

PrefixCssPlugin.prototype.apply = function (compiler) {

  compiler.plugin('emit', function (compilation, callback) {
    var prefixedCssContent = '';
    for (var filename in compilation.assets) {
      for (var pattern in filePatterns) {
        if (filePatterns[pattern].test(filename)) {
          var content = compilation.assets[filename].source();
          console.log('Prefix  elemnets: ' + shouldPrefixElements);
          prefixedCssContent = (0, _cssPrefixer2.default)(content, cssPrefix, shouldPrefixElements);

          compilation.assets[generateFileName(filename)] = {
            source: function source() {
              return prefixedCssContent;
            },
            size: function size() {
              return prefixedCssContent.length;
            }
          };
        }
      }
    }

    callback();
  });
};

function generateFileName(filename) {
  var fileNameParts = filename.split('.');
  return '' + fileNameParts[0] + fileSuffix + '.' + fileNameParts[1];
}

module.exports = PrefixCssPlugin;