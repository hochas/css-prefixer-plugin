Klonad från [css-class-prefixer-loader](https://www.npmjs.com/package/css-class-prefixer-loader).  
Källkoden finns inte på git, men har fixat ett antal buggar i detta repo.

# CSS Class Prefixer Loader

CSS Class Prefixer Loader plugin for webpack. 

Automatically adds prefixes to CSS classes, for webpack. 

### Usage

```js
require('!css-class-prefixer-loader?mode=css&prefix=sjv-!myfile.css');
require('!css-class-prefixer-loader?mode=html&prefix=sjv-!myfile.css');
```

### Usage in webpack config

```js
{
	module: {
		loaders: [
			{ test: /\.css$/, loader: "css-class-prefixer-loader?mode=css&prefix=sjv-" }, 
			{ test: /\.html$/, loader: "css-class-prefixer-loader?mode=html&prefix=sjv-" }, 
		], 
	}, 
}
```

### Config options

- `prefix` - the prefix to use
- `mode` - either 'css' or 'html'