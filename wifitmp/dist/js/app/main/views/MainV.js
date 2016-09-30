define(["jquery","underscore","backbone","bootstrap","text/text!../template/main.tpl","../models/MainM"],function(e,t,n,i,r,a){var o=n.View.extend({el:e("#container"),model:new a,initialize:function(){},render:function(){this.$el.html(t.template(r)({username:this.username}))}});return o});
//# sourceMappingURL=MainV.js.map
