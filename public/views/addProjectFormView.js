(function ($, _, Backbone, Mustache) {

	var BaseView = Backbone.View,

		AddProjectFormView = BaseView.extend({

			initialize: function (options) {
				var _this = this;
				BaseView.prototype.initialize.call(_this, options),
				_this.data=options;

			},


			template: $('#addProjectForm').html(),

			render: function () {
				var _this = this,
					$el = _this.$el,
					data = _this.data.data,
					submitProjectFormData=function(e){
						title=$("#title")[0].value;
						desc=$("#desc")[0].value;
						value=$("#members-number")[0].value;
						id="p"+(data.projects.length+1);
						project={id:id,name:title,desc:desc,members:[],tasks:[]};
						console.log(project);
						data.projects.push(project);
						window.data.projects=data.projects;
						e.currentTarget.parentNode.parentNode.remove();
						$.getScript("/public/app.js");
						
				};

				$el.append(Mustache.render(_this.template, {}));
				$el.find("div#form-head div#cross").on("click",window.functions.addEventsButtons);
				$el.find("div#form-foot a#cancel-project").on("click",window.functions.addEventsButtons);
				$el.find("div#form-foot a#create-new-project").on("click",submitProjectFormData);
				return _this;
			}

			

			
		});
		
		window.modules.AddProjectFormView = AddProjectFormView; 

})(jQuery, _, Backbone, Mustache);







