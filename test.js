
var mk = require('./index').bind({
	cacheable: function(){}, 
	query: '?mode=css&prefix=sjv-'
});

console.log(mk(
	`.o-container {
		margin-right: auto;
		margin-left: auto;
	}`
)); 

console.log(mk(
	`@media (min-width: 576px) {
		.o-container {
			max-width: 720px;
		}
	}`
));