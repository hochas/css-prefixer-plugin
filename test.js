
var mk = require('./index').bind({
	cacheable: function(){}, 
	query: '?prefix=my-',
	mode: 'html',
});

console.log( mk(" <div class='Graphics EMFooter'> Hello <b class='verybold'>World</b>! </div>  ") ); 

