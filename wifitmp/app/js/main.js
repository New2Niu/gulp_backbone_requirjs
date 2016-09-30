require.config({
	baseUrl:'js/lib',

	paths:{
		jquery: 'jquery/dist/jquery.min',
		underscore:'underscore/underscore-min',
		backbone: 'backbone/backbone-min',
		localStorage:'backbone.localStorage/backbone.localStorage-min',
		bootstrap:'bootstrap/dist/js/bootstrap',
		app:'../app'
		
	},
	shim:{
		'bootstrap':{
			deps:['jquery']
		}
	}
});


require([
	'app/login/views/LoginV'
	],function(LoginV){
		var loginV = new LoginV();
});