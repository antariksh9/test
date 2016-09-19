(function ($, _, Backbone, Mustache) {

	var BaseView = Backbone.View,

		AddMemberFormView = BaseView.extend({

			initialize: function (options) {
				var _this = this;
				BaseView.prototype.initialize.call(_this, options),
				_this.data=options;

			},


			template: $('#addMemberForm').html(),

			render: function () {
				var _this = this,
					$el = _this.$el,
					data = _this.data.data,
					project=_this.data.project,
					render,
					submitMemberFormData=function(e){
						title=$("#title")[0].value;
						console.log(title);
						projectId=project.id;
						memberId="m"+(data.members.length+1);
						_.each(data.projects,function(project){
							if(project.id==projectId){
								project.members.push(memberId);
							}
						});
						member={id:memberId,name:title};
						data.members.push(member);
						window.data.members=data.members;
						e.currentTarget.parentNode.parentNode.remove();
						$.getScript("/public/app.js");
						
				};

				render=Mustache.render(_this.template, {});
				div=document.createElement("div");
				div.innerHTML=render;
				$(div).find("div#overlay-initial-member div#form-head div#cross").on("click",window.functions.addEventsButtons);
				$(div).find("div#overlay-initial-member div#form-foot a#cancel-project").on("click",window.functions.addEventsButtons);
				$(div).find("div#overlay-initial-member div#form-foot a#create-new-project").on("click",submitMemberFormData);
				$el.append($(div).find("div#overlay-initial-member"));
				return _this;
			}

			

			
		});
		
		window.modules.AddMemberFormView = AddMemberFormView; 

})(jQuery, _, Backbone, Mustache);







