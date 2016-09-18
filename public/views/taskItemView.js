// taskItemView=function(task,parent){
// 	var rendered;
// 	$.get("/public/templates/taskItem.html",function(template){
// 	  	rendered=Mustache.render(template,{"task":task});	
// 	  	parentDiv=document.getElementById(parent.name);
// 	  	$(parentDiv).append(rendered);
// 	 });
// }
var taskItemView=Backbone.View.extend({
	initialize:function(attr){
		this.options=attr;
		this.render();
	},
	render:function(){
		var op=this;
		$.get("/public/templates/taskItem.html",function(template){
		  	rendered=Mustache.render(template,{"task":op.options.task});	
		  	parentDiv=document.getElementById(op.options.parent.name);
		  	$(parentDiv).append(rendered);
		 });
	}
});