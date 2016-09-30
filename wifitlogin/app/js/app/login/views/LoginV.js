define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'../services/loginS',
	'../models/LoginM'
	],function($,_,Backbone,Bootstrap,loginS,LoginM){
		var LoginV = Backbone.View.extend({
			el:$('#container'),
			model:new LoginM(),
			events:{
				'click #login-button':'login',
				'click #btnRest' :'reset'
			},
			initialize:function(){
				this.model.on('invalid',function(model,error){
		    		alert(error);
		    		$('form').fadeIn(500);
					$('.wrapper').removeClass('form-success');
		    	});
				this.render();
			},
			render:function(){
				//this.$el.html(_.template(tpl));
				this.$el.html(_.template($('#template_login').html()))
				$('#login-button').click(function (event) {
					event.preventDefault();
					$('form').fadeOut(500);
					$('.wrapper').addClass('form-success');
				});
			},
			login:function(e){
				loginS.login(e,this);
			},

		});
		return LoginV;
});