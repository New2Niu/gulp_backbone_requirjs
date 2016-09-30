define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'text/text!../template/login.tpl',
	'../services/loginS',
	'../models/LoginM'
	],function($,_,Backbone,Bootstrap,tpl,loginS,LoginM){
		var LoginV = Backbone.View.extend({
			el:$('#container'),
			model:new LoginM(),
			events:{
				'click #btnLogin':'login',
				'click #btnRest' :'reset'
			},
			initialize:function(){
				this.model.on('invalid',function(model,error){
		    		alert(error);
		    	});
				this.render();
			},
			render:function(){
				this.$el.html(_.template(tpl));
			},
			login:function(e){
				loginS.login(e,this);
			},

		});
		return LoginV;
});