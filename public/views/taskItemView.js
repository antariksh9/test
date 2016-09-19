(function($, _, Backbone, Mustache) {

	var BaseView = Backbone.View,

		TaskItemView = BaseView.extend({

			initialize: function(options) {
				var _this = this;
				BaseView.prototype.initialize.call(_this, options);
				_this.task = options;
			},

			template: $('#taskItem')
				.html(),

			render: function() {
				var _this = this,
					$el = _this.$el,
					task = _this.task.task,
					render, div1, status, button, taskElement;

				render = Mustache.render(_this.template, {
					task: task
				});
				div1 = document.createElement('div');
				div1.innerHTML = render;
				status = $(div1)
					.find("div.task-box button.status-button")[0].innerHTML;
				button = $(div1)
					.find("div.task-box button.status-button")[0];
				$(button)
					.on("click", function() {
						$.getScript("/public/views/dropDownListView.js", function() {
							$item = new window.modules.DropDownListView({
									parent: button,
									task: task
								})
								.render()
								.$el;
							$('body')
								.append($item);
						})
					});
				taskElement = $(div1)
					.find("div.task-box")[0];
				if (status === 'On Hold') {
					taskElement.style.borderLeft = "1px solid blue";
					button.style.backgroundColor = "blue";
				} else if (status === 'In Process') {
					taskElement.style.borderLeft = "1px solid yellow";
					button.style.backgroundColor = "yellow";
				}
				if (status === 'Sent') {
					taskElement.style.borderLeft = "1px solid red";
					button.style.backgroundColor = "red";
				}
				$el.append($(div1)
					.find('.task-box'));
				return _this;
			}


		});

	window.modules.TaskItemView = TaskItemView;

})(jQuery, _, Backbone, Mustache);