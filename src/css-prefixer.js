var css = require('css');

var warn = function(msg) {
  return console.warn('[css-class-prefix-plugin] Warning: ' + msg);
};

/**
 * Prefixes css classes.
 * 
 * @param {*} str CSS string
 * @param {*} prefix prefix to add
 * @param {*} shouldPrefixElements boolean indicating if elements should be prefixed
 */
export default function(str, prefix, shouldPrefixElements) {
  var ast = css.parse(str, { silent: true });

  // don't care if it's not a valid result
  if (!ast || typeof ast != 'object' || ast === null) {
    warn('CSS parser returned nothing for input source');
    return str;
  }

  // ast sanity check
  if (
    !ast.stylesheet ||
    !ast.stylesheet.rules ||
    !ast.stylesheet.rules.length
  ) {
    warn('CSS parser did not parse input source, or no CSS rules were found');
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
      handleMediaQueryRule(rule, ast, i, prefix, shouldPrefixElements);
    }

    if (isNull(rule.selectors)) {
      // Selector 
      continue;
    }

    handleRule(rule, ast, i, prefix, shouldPrefixElements);
  }

  return css.stringify(ast, {
    compress: true
  });
};

var handleMediaQueryRule = function(rule, ast, i, prefix, shouldPrefixElements) {
  for (var j = 0; j < rule.rules.length; j++) {
    for (var k = 0; k < rule.rules[j].selectors.length; k++) {
      var selector = rule.rules[j].selectors[k];

      if (isNull(selector) || isPseudoSelector(selector)) {
        continue;
      }

      var modifiedSelector = setSelector(selector, prefix, shouldPrefixElements);

      ast.stylesheet.rules[i].rules[j].selectors[k] = modifiedSelector
        ? modifiedSelector
        : selector;
    }
  }
};

var handleRule = function(rule, ast, i, prefix, shouldPrefixElements) {
  for (var j = 0; j < rule.selectors.length; j++) {
    var selector = rule.selectors[j];

    if (isNull(selector) || isPseudoSelector(selector)) {
      continue;
    }

    var modifiedSelector = setSelector(selector, prefix, shouldPrefixElements);

    ast.stylesheet.rules[i].selectors[j] = modifiedSelector
      ? modifiedSelector
      : selector;
  }
};

var setSelector = function(selector, prefix, shouldPrefixElements) {
  var modifiedSelector = null;
  if (isClass(selector)) {
    modifiedSelector = applyPrefixToSelector(selector, prefix);
  }
  if (!isClass(selector) && shouldPrefixElements) {
    modifiedSelector = selector + '.' + prefix.replace('-', '');
  }
  return modifiedSelector;
};

var isNull = function(string) {
  return !string || !string.length;
};

var isPseudoSelector = function (selector) {
  return selector.indexOf(':') > -1;
}

var isClass = function(selector) {
  return selector.indexOf('.') > -1;
};

var applyPrefixToSelector = function(selector, prefix) {
  return selector.split('.').join('.' + prefix);
};