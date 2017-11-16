Klonad från [css-class-prefixer-loader](https://www.npmjs.com/package/css-class-prefixer-loader).  
Källkoden finns inte på GitHub, men har fixat ett antal buggar i detta repo.

# CSS Class Prefixer Loader

CSS Class Prefixer Loader plugin for webpack. 

Automatically adds prefixes to CSS classes, for webpack. 

## Usage

```js
require('!css-class-prefixer-loader?mode=css&prefix=sjv-!myfile.css');
```

### Usage in webpack config

```js
{
	module: {
		loaders: [
			{ test: /\.css$/, loader: "css-class-prefixer-loader?mode=css&prefix=sjv-" }
		], 
	}, 
}
```

### Config options

| option | type | values | usage |
| -------- | -------- | -------- | -------- |
| `prefix` | `string` | Default: `sjv-` | Prefix to add to classes |
| `mode`   | `string` | `css` | Replace mode |
| `elements` | `boolean`| `true` <br> `false` <br>  Default: `false` | If styled elements should have the prefix appended. For instance, given prefix `sjv-`, `body` would become `body.sjv`. The dash is automatically removed | 

### Testing

See test cases in `test.js`. No assertions are made, validate the output manually.

Just run `node test.js` to see the ouput.