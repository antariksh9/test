(function ($, _, Backbone, Mustache) {

	var BaseView = Backbone.View,

		TaskItemView = BaseView.extend({

			initialize: function (options) {
				var _this = this;
				BaseView.prototype.initialize.call(_this, options);
				_this.task = options;
			},

			template: $('#taskItem').html(),

			render: function () {
				var _this = this,
					$el = _this.$el,
					task = _this.task.task;

				$el.append(Mustache.render(_this.template, {task : task}));
				
				return _this;
			}

			
		});

		window.modules.TaskItemView = TaskItemView; 

})(jQuery, _, Backbone, Mustache);