// projectLandingView=function(projectData,projects,members,tasks){
// 	var rendered,url,index,currentProject;
// 	url=window.location.href.split("/");
// 	// url=url[url.length-1];
// 	url="p1";
// 	index=_.findIndex(projects,{"id":url});
// 	currentProject=projects[index];
// 	$.get("/public/templates/projectLanding.html",function(template){
// 	  	rendered=Mustache.render(template,{"head":projects[index].name});
// 	  	$(document.body).append(rendered);
// 		$.getScript('/public/views/memberStreamView.js', function()
// 		{
// 			_.each(members,function(member){
// 				if(_.contains(currentProject.members,member.id)){
// 					memberStreamView(member,tasks);
// 				}
// 			});

// 		});
// 	});
// };
var projectLandingView=Backbone.View.extend({
	initialize : function(attr){
		url=window.location.href.split("/");
		url=url[url.length-1];
		this.options=attr;
		this.options.url=url;
		this.options.index=_.findIndex(this.options.projects,{"id":this.options.url});
		this.render();
	},
	render:function(){
		var op=this;
		currentProject=op.options.projects[op.options.index];
		$.get("/public/templates/projectLanding.html",function(template){
	  	rendered=Mustache.render(template,{"head":currentProject.name});
	  	$(document.body).append(rendered);
		$.getScript("/public/views/memberStreamView.js", function()
		{
			_.each(op.options.members,function(member){
				if(_.contains(currentProject.members,member.id)){
					new memberStreamView({"member":member,"tasks":op.options.tasks});
				}
			});

		});
		 
		});
	}
});