(function($, _, Backbone, Mustache) {

	var BaseView = Backbone.View,

		AddTaskItemView = BaseView.extend({

			initialize: function(options) {
				var _this = this;
				BaseView.prototype.initialize.call(_this, options);
				_this.data = options;

			},

			template: $('#addTaskItem')
				.html(),

			render: function() {
				var _this = this,
					$el = _this.$el,
					member = _this.data.member,
					data = _this.data.data,
					project = _this.data.project,
					render, div;
				render = Mustache.render(_this.template, {
					member: member
				});
				div = document.createElement('div');
				div.innerHTML = render;
				$(div)
					.find(".addtask-box")
					.on("click", function(e) {
						$.getScript("/public/views/addTaskFormView.js", function(AddTaskFormView) {
							var $Item = new window.modules.AddTaskFormView({
									data: data,
									member: member,
									project: project
								})
								.render()
								.$el;
							e.preventDefault();
							$('body')
								.append($Item.find("#overlay-initial-task"));
						});
					});
				$el.append($(div)
					.find(".addtask-box"));
				return _this;
			}


		});

	window.modules.AddTaskItemView = AddTaskItemView;

})(jQuery, _, Backbone, Mustache);