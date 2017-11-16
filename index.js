var qs = require('querystring'); 
var html = require('cheerio');
var css = require('css');

var defaultPrefix = 'sjv-';

var warn = function(msg){
	return console.warn('[css-class-prefix-loader] Warning: ' + msg);
}

/**
 * Prefixes css classes.
 * 
 * @param {*} str CSS string
 * @param {*} prefix prefix to add
 */
var parseCSS = function(str, prefix){
	var ast = css.parse(str, {silent:true});
	
	// don't care if it's not a valid result
	if(!ast || typeof(ast)!='object' || ast===null){
		warn('CSS parser returned nothing for input source');
		return str;
	}
	
	// ast sanity check
	if(!ast.stylesheet || !ast.stylesheet.rules || !ast.stylesheet.rules.length){
		warn('CSS parser did not parse input source, or no CSS rules were found');
		return str;
	}
	
	// take all 1 by 1 and replace them
	for(var i = 0; i< ast.stylesheet.rules.length; i++){

		var rule = ast.stylesheet.rules[i];

		// JKARV: Fix for @media types
		if (rule.type === 'media') {
			for (var j = 0; j < rule.rules.length; j++) {
				for (var k = 0; k < rule.rules[j].selectors.length; k++) {
					var selector = rule.rules[j].selectors[k];

					if(!selector || !selector.length || selector.indexOf('.') === -1){
						continue;
					}

					var prefixedSelector = selector.split('.').join('.' + prefix);
					ast.stylesheet.rules[i].rules[j].selectors[k] = prefixedSelector;
				}
			}
		}

		if(!rule || !rule.selectors || !rule.selectors.length){
			continue; 
		}
		
		for(var j=0; j< rule.selectors.length; j++){
			var selector = rule.selectors[j]; 
			
			if(!selector || !selector.length || selector.indexOf('.') === -1){
				continue;
			}
			
			// apply prefixes
			ast.stylesheet.rules[i].selectors[j] = selector.split('.').join('.' + prefix);
		}
	}

	return css.stringify(ast, {});
}

/**
 * Main entry point
 * 
 * @param {*} str Stylesheet as a string
 */
module.exports = function(str){
	// mark as cacheable for webpack
	this.cacheable(); 

	// read prefix
	var prefix = defaultPrefix;
	var mode = null;
	if(this.query){
		var query = qs.parse(this.query.substr(1));
		prefix = query.prefix && query.prefix.length ? query.prefix : defaultPrefix;
		mode = query.mode && query.mode.length ? query.mode : null;
	}
	
	// valid mode type
	if(!mode || typeof(mode)!='string' || !mode.length){
		warn('no mode specified');
		return str;
	}
	
	// parse according to mode
	var result = str;
	switch(mode){
		case 'css':
			result = parseCSS(str, prefix); 
			break;
		default:
			warn('invalid input source parsing mode specified');
			break;
	}
	
	// done
	return result;
}