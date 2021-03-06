(function($, _, Backbone, Mustache) {

	var BaseView = Backbone.View,

		ProjectItemView = BaseView.extend({

			initialize: function(options) {
				var _this = this;

				BaseView.prototype.initialize.call(_this, options);

				_this.project = options;
			},

			template: $('#projectItemTile')
				.html(),

			render: function() {
				var _this = this,
					$el = _this.$el,
					project = _this.project.project;

				$el.append(Mustache.render(_this.template, {
					"project": project
				}));
				return _this;
			}
		});

	window.modules.ProjectItemView = ProjectItemView;

})(jQuery, _, Backbone, Mustache);