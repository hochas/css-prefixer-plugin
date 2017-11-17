let cases = [];
cases.push(require('./index').bind({
	cacheable: function(){}, 
	query: '?mode=css'
}));

cases.push(require('./index').bind({
	cacheable: function(){}, 
	query: '?mode=css&elements=true&prefix=sjv-'
}));

cases.push(require('./index').bind({
	cacheable: function(){}, 
	query: '?mode=css&prefix=my-'
}));

cases.push(require('./index').bind({
	cacheable: function(){}, 
	query: '?mode=css&prefix=my-&elements=true'
}));

let mediaQueryCss =
	`@media (min-width: 576px) {
		.o-container {
			max-width: 720px;
		}

		body {
			background: #FFF;
		}
	}`;

let css =
	`.o-container {
		margin-right: auto;
		margin-left: auto;
	}

	body {
		background: #FFF;
	}`;


for (var i = 0; i < cases.length; i++) {
	console.log('Running test case ' + (i + 1) + ':\n');
	console.log(cases[i](mediaQueryCss));
	console.log(cases[i](css));
	console.log('\n\n');
}