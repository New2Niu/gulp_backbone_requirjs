define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'../models/MainM'
	],function($,_,Backbone,Bootstrap,MainM){
		var MainV = Backbone.View.extend({
			el:$('#container'),
			//template:_.template(tpl),
			model:new MainM(),
			initialize:function(){
				//this.render();
			},

			render:function(){
				//loginS  传递this.username
				this.$el.html(_.template($('#template_main').html())({username:this.username}));
			}
		});
		return MainV;
})