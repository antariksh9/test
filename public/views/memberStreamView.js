// memberStreamView=function(member,tasks){
	// var rendered;
	// $.get("/public/templates/memberStream.html",function(template){
	//   	rendered=Mustache.render(template,{"member":member});
	//   	$("#main-task-container").append(rendered);
	//   	$.getScript('/public/views/taskItemView.js', function()
	// 	{
	// 		_.each(tasks,function(task){
	// 			if(task.owner==member.id){
	// 				taskItemView(task,member);
	// 			}
	// 		});

	// 	});
	//  });
// };
var memberStreamView=Backbone.View.extend({
	initialize:function(attr){
		this.options=attr;
		this.render();
	},
	render : function(){
		var op=this;
		$.get("/public/templates/memberStream.html",function(template){

		  	rendered=Mustache.render(template,{"member":op.options.member});
		  	$("#main-task-container").append(rendered);
		  	$.getScript('/public/views/taskItemView.js', function()
			{
				_.each(op.options.tasks,function(task){
					if(task.owner==op.options.member.id){
						new taskItemView({"task":task,"parent":op.options.member});
					}
				});
				

			});
		 });
	}
});
