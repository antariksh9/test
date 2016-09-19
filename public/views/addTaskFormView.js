(function ($, _, Backbone, Mustache) {

	var BaseView = Backbone.View,

		AddTaskFormView = BaseView.extend({

			initialize: function (options) {
				var _this = this;
				BaseView.prototype.initialize.call(_this, options),
				_this.data=options;

			},


			template: $('#addTaskForm').html(),

			render: function () {
				var _this = this,
					$el = _this.$el,
					data = _this.data.data,
					member=_this.data.member,
					project=_this.data.project,
					render,div,
					submitTaskFormData=function(e){
						title=$("#title")[0].value;
						desc=$("#desc")[0].value;
						status=$("#status")[0].value;
						console.log(status);
						id="t"+(data.tasks.length+1);
						task={id:id,name:title,desc:desc,owner:member,project:project.id,status:status};
						console.log(task);
						data.tasks.push(task);
						window.data.tasks=data.tasks;
						e.currentTarget.parentNode.parentNode.remove();
						$.getScript("/public/app.js");
						
				};

				render=Mustache.render(_this.template, {});
				div=document.createElement('div');
				div.innerHTML=render;
				$(div).find("#overlay-initial-task div#form-head div#cross").on("click",window.functions.addEventsButtons);
				$(div).find("#overlay-initial-task div#form-foot a#cancel-project").on("click",window.functions.addEventsButtons);
				$(div).find("#overlay-initial-task div#form-foot a#create-new-project").on("click",submitTaskFormData);
				$el.append($(div).find('#overlay-initial-task'));
				return _this;
			}

			

			
		});
		
		window.modules.AddTaskFormView = AddTaskFormView; 

})(jQuery, _, Backbone, Mustache);







