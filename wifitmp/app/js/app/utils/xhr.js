define([
	'jquery',
	'underscore',
	'backbone',
	],function($,_,Backbone){
		var xhr = {
			ajax:function(url,params,type,callback){
				$.ajax({
					url:url,
					data:params,
					type:type,
				}).done(function(response){
					callback(response);
				});
			}
		};
		return xhr;
});