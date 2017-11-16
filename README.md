# CSS Class Prefixer Loader

CSS Class Prefixer Loader plugin for webpack. 

Automatically adds prefixes to CSS classes, for webpack. 

### Usage

```js

require('!css-class-prefixer?mode=css&prefix=my-!myfile.css');
require('!css-class-prefixer?mode=html&prefix=my-!myfile.css');
```

### Usage in webpack config

```js
{
	module: {
		loaders: [
			{ test: /\.css$/, loader: "css-class-prefixer?mode=css&prefix=my-" }, 
			{ test: /\.html$/, loader: "css-class-prefixer?mode=html&prefix=my-" }, 
		], 
	}, 
}
```

### Config options

- `prefix` - the prefix to use
- `mode` - either 'css' or 'html'

