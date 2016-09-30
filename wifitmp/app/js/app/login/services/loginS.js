define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'../views/LoginV',
	'app/utils/xhr',
	'text/text!../template/progress.tpl',
	'app/main/views/MainV'
	],function($,_,Backbone,Bootstrap,LoginV,xhr,tpl,MainV){
		var loginS = {
			//loginV
			login:function(e,that){
				var self = this;
				self.userid = $('#userid').val();
				self.passwd = $('#passwd').val();
				var m = {
					userid:self.userid,
					passwd:self.passwd
				};

				if (that.model.set(m,{validate: true})) {
					self.flag = false;
					self.progressBar();

					xhr.ajax('data/data.json',{},'GET',function(reponse){
						
						self.flag = true;
						
					});
				}
				

			},
			reset:function(e,that){

			},

			progressBar:function(){
				var self = this;
				var mask = $('<div></div>');
				mask.addClass('mask');
				$('body').append(mask);
				
				var proDiv = $('<div></div>');
				proDiv.addClass('progress-div');
				var pr = $(tpl);
				proDiv.append(pr);
				$('body').append(proDiv);

				var a = 0;
				var si = setInterval(function(){
					//$('.progress-bar')[0].style.width=(a+10)+'%';
					$('.progress-bar').css('width',(a+10)+'%');
					a = a+10;
					if(a==100 ){
						if(self.flag){
							clearInterval(si);
							mask.remove();
							proDiv.remove();
							$('#loginDiv').remove();
							var mainV = new MainV();
							//mainV.model.set({username:self.userid});
							mainV.username=self.userid;
							mainV.render();
						}
						a=0;
					}
				},200);
			}
		};
		return loginS;

});