# CSS Prefixer Plugin

CSS Class Prefixer Plugin for webpack. 

Automatically adds prefixes to CSS classes, for webpack. 

## Usage

```js
const PrefixCssPlugin = require('@sjv/css-prefixer-plugin');
const prefixCss = new PrefixCssPlugin({
    filePatterns: [
        /\.css$/
    ],
    cssPrefix: 'sjv-',
    prefixElements: true
});

plugins: [
	prefixCss,
	...
	]
```

### Config options

| option | type | values | required | usage |
| -------- | -------- | -------- | -------- | -------- |
| `filePatterns` | `array` | | `true` | Array of regular expressions |
| `cssPrefix`   | `string` | | `true` |  Prefix to add to classes |
| `prefixElements` | `boolean`| `true` <br> `false` <br>  Default: `false` | `false` | If styled elements should have the prefix appended. For instance, given prefix `sjv-`, `body` would become `body.sjv`. The dash is automatically removed | 
| `fileSuffix` | `string` | Default: `-prefixed` | `true` | With default setting, file name `sjv-main.css` would become `sjv-main-prefixed.css` |