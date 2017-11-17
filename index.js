var qs = require("querystring");
var html = require("cheerio");
var css = require("css");

var defaultPrefix = "sjv-";
var prefix;
var shouldAddClassToElements;

var warn = function(msg) {
  return console.warn("[css-class-prefix-loader] Warning: " + msg);
};

/**
 * Prefixes css classes.
 * 
 * @param {*} str CSS string
 * @param {*} prefix prefix to add
 */
var parseCSS = function(str, prefix, shouldAddClassToElements) {
  var ast = css.parse(str, { silent: true });

  // don't care if it's not a valid result
  if (!ast || typeof ast != "object" || ast === null) {
    warn("CSS parser returned nothing for input source");
    return str;
  }

  // ast sanity check
  if (
    !ast.stylesheet ||
    !ast.stylesheet.rules ||
    !ast.stylesheet.rules.length
  ) {
    warn("CSS parser did not parse input source, or no CSS rules were found");
    return str;
  }

  // take all 1 by 1 and replace them
  for (var i = 0; i < ast.stylesheet.rules.length; i++) {
    var rule = ast.stylesheet.rules[i];

    if (!rule) {
      // Nothing to parse
      continue;
    }

    if (isNull(rule.rules) && isNull(rule.selectors)) {
      // No rules or selectors, skip
      continue;
    }

    if (rule.type === 'media') {
      handleMediaQueryRule(rule, ast, i);
    }

    if (isNull(rule.selectors)) {
      // Selector 
      continue;
    }

    handleRule(rule, ast, i);
  }

  return css.stringify(ast, {});
};

var handleMediaQueryRule = function(rule, ast, i) {
  for (var j = 0; j < rule.rules.length; j++) {
    for (var k = 0; k < rule.rules[j].selectors.length; k++) {
      var selector = rule.rules[j].selectors[k];

      if (isNull(selector)) {
        continue;
      }

      var modifiedSelector = setSelector(selector);

      ast.stylesheet.rules[i].rules[j].selectors[k] = modifiedSelector
        ? modifiedSelector
        : selector;
    }
  }
};

var handleRule = function(rule, ast, i) {
  for (var j = 0; j < rule.selectors.length; j++) {
    var selector = rule.selectors[j];

    if (isNull(selector)) {
      continue;
    }

    var modifiedSelector = setSelector(selector);

    ast.stylesheet.rules[i].selectors[j] = modifiedSelector
      ? modifiedSelector
      : selector;
  }
};

var setSelector = function(selector) {
  var modifiedSelector = null;
  if (isClass(selector)) {
    modifiedSelector = applyPrefixToSelector(selector, prefix);
  }
  if (!isClass(selector) && shouldAddClassToElements) {
    modifiedSelector = selector + "." + prefix.replace("-", "");
  }
  return modifiedSelector;
};

var isNull = function(string) {
  return !string || !string.length;
};

var isClass = function(selector) {
  return selector.indexOf(".") > -1;
};

var applyPrefixToSelector = function(selector, prefix) {
  return selector.split(".").join("." + prefix);
};

/**
 * Main entry point
 * 
 * @param {*} str Stylesheet as a string
 */
module.exports = function(str) {
  // mark as cacheable for webpack
  this.cacheable();

  // read prefix
  prefix = defaultPrefix;
  var mode = null;
  shouldAddClassToElements = false;
  if (this.query) {
    var query = qs.parse(this.query.substr(1));
    prefix = query.prefix && query.prefix.length ? query.prefix : defaultPrefix;
    mode = query.mode && query.mode.length ? query.mode : null;
    shouldAddClassToElements = query.elements ? query.elements : false;
  }

  // valid mode type
  if (!mode || typeof mode != "string" || !mode.length) {
    warn("no mode specified");
    return str;
  }

  // parse according to mode
  var result = str;
  switch (mode) {
    case "css":
      result = parseCSS(str, prefix, shouldAddClassToElements);
      break;
    default:
      warn("invalid input source parsing mode specified");
      break;
  }

  // done
  return result;
};
