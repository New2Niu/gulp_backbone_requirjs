define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'text/text!../template/main.tpl',
	'../models/MainM'
	],function($,_,Backbone,Bootstrap,tpl,MainM){
		var MainV = Backbone.View.extend({
			el:$('#container'),
			//template:_.template(tpl),
			model:new MainM(),
			initialize:function(){
				//this.render();
			},

			render:function(){
				//loginS  传递this.username
				this.$el.html(_.template(tpl)({username:this.username}));
			}
		});
		return MainV;
})