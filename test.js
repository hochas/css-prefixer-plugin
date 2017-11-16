
var sjvPrefixAndPrefixedElements = require('./index').bind({
	cacheable: function(){}, 
	query: '?mode=css&elements=true&prefix=sjv-'
});

console.log('Prefixing elements and classes with sjv:\n');

console.log('Without media query:\n')
console.log(sjvPrefixAndPrefixedElements(
	`.o-container {
		margin-right: auto;
		margin-left: auto;
	}

	body {
		background: #FFF;
	}
	\n`
)); 

console.log('With media query:\n')
console.log(sjvPrefixAndPrefixedElements(
	`@media (min-width: 576px) {
		.o-container {
			max-width: 720px;
		}

		body {
			background: #FFF;
		}
	}
	\n`
));

// ==================================================================

var sjvPrefix = require('./index').bind({
	cacheable: function(){}, 
	query: '?mode=css&prefix=sjv-'
});


console.log('Prefixing classes with sjv:\n');

console.log('Without media query:\n')
console.log(sjvPrefix(
	`.o-container {
		margin-right: auto;
		margin-left: auto;
	}

	body {
		background: #FFF;
	}
	\n`
)); 

console.log('With media query:\n')
console.log(sjvPrefix(
	`@media (min-width: 576px) {
		.o-container {
			max-width: 720px;
		}

		body {
			background: #FFF;
		}
	}
	\n`
));

// ==================================================================

var sjvDefaultPrefix = require('./index').bind({
	cacheable: function(){}, 
	query: '?mode=css'
});


console.log('Prefixing classes with sjv using default prefix:\n');

console.log('Without media query:\n')
console.log(sjvDefaultPrefix(
	`.o-container {
		margin-right: auto;
		margin-left: auto;
	}

	body {
		background: #FFF;
	}
	\n`
)); 

console.log('With media query:\n')
console.log(sjvDefaultPrefix(
	`@media (min-width: 576px) {
		.o-container {
			max-width: 720px;
		}

		body {
			background: #FFF;
		}
	}
	\n`
));