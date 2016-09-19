(function($, _, Backbone, Mustache) {

	var BaseView = Backbone.View,

		DropDownListView = BaseView.extend({

			initialize: function(options) {
				var _this = this;
				BaseView.prototype.initialize.call(_this, options),
					_this.data = options;
			},

			events: {
				'click #dropdown-status': 'changeStatus'
			},

			template: $('#dropDownList')
				.html(),

			render: function() {
				var _this = this,
					$el = _this.$el,
					data = _this.data,
					list, right, left, top;

				$el.append(Mustache.render(_this.template, {
					class: data.task.id
				}));

				list = $el.find('#dropdown-status');

				right = data.parent.offsetLeft + $(data.parent)
					.width();
				top = data.parent.offsetTop + $(data.parent)
					.height() - 3;
				left = right - $(list)
					.width();
				if (left < 0) {
					left = 0;
				}
				list[0].style.position = "absolute";
				list[0].style.top = top + 'px';
				list[0].style.left = left + 'px';
				$('body')
					.on('click', function(e) {
						if ($(e.target.parentNode) != $('#dropdown-status')) {
							$('#dropdown-status')
								.remove();
						}
					});
				return _this;

			},

			changeStatus: function(e) {

				var newStatus = e.target.innerHTML,
					parentTask = e.target.parentNode.className;

				$(e.target.parentNode)
					.remove();
				_.each(window.data.tasks, function(task) {
					if (task.id == parentTask) {
						task.status = newStatus;
					}
				})
				$.getScript("/public/app.js");
			}

		});

	window.modules.DropDownListView = DropDownListView;

})(jQuery, _, Backbone, Mustache);