define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	],function($,_,Backbone,Bootstrap){
		var LoginM = Backbone.Model.extend({
			validate:function(attrs){
				for(var key in attrs){
					if($.trim(attrs[key])==''){
						return '用户名或密码不能为空！'
					}
				}
			},
		});

		return LoginM;
});