(function ($, _, Backbone, Mustache) {

	var BaseView = Backbone.View,

		CreateProjectView = BaseView.extend({

			initialize: function (options) {
				var _this = this;

				BaseView.prototype.initialize.call(_this, options);

			},

			template: $('#createProjectItemTile').html(),

			render: function () {
				var _this = this,
					$el = _this.$el;

				$el.append(Mustache.render(_this.template, {}));
				return _this;
			}

			
		});

		window.modules.CreateProjectView = CreateProjectView; 

})(jQuery, _, Backbone, Mustache);







